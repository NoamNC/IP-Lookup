<template>
  <div class="search-bar-container">
    <div class="circle">
      <span>{{ searchBarIdx + 1 }}</span>
    </div>
    <v-text-field
      v-model="ip"
      dense
      :rules="[rules.ip]"
      outlined
      single-line
      clearable
      :disabled="loading"
      label="IP address"
      @click:clear="clearSearchbar"
      @blur="getData"
    ></v-text-field>
    <v-progress-circular
      size="25"
      class="loader"
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-show="!loading" class="country-info">
      <v-tooltip bottom v-if="countryInfo">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-if="countryInfo"
            v-bind="attrs"
            v-on="on"
            :src="countryInfo.flagUrl"
            alt="flag"
            class="flag"
          />
        </template>
        <span>{{ countryInfo.name }}</span>
      </v-tooltip>
      <LiveClock v-if="countryInfo" :timeZoneName="countryInfo.timeZoneName" />
      <v-tooltip bottom v-if="errorMessage">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" color="error" class="error-icon">
            mdi-alert-circle
          </v-icon>
        </template>
        <span>{{ errorMessage }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import LiveClock from './LiveClock.vue';

export default {
  name: 'IpLocation',
  components: {
    LiveClock,
  },
  props: {
    searchBarIdx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      ip: null,
      rules: {
        ip: (value) => {
          if (value === null || value === '') {
            return true;
          }
          return this.isIp(value) || 'Invalid IP address.';
        },
      },
      loading: false,
      countryInfo: null,
      errorMessage: null,
    };
  },
  methods: {
    clearSearchbar() {
      this.ip = null;
      this.rules.ip = true;
      this.errorMessage = null;
      this.countryInfo = null;
      this.$store.commit('updateSearchBarData', {
        searchBarIdx: this.searchBarIdx,
        searchBarObj: {},
      });
    },
    isIp(ip) {
      const pattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
      return pattern.test(ip);
    },
    async getData() {
      if (!this.ip || !this.isIp(this.ip)) {
        this.countryInfo = null;
        this.errorMessage = null;
        this.$store.commit('updateSearchBarData', {
          searchBarIdx: this.searchBarIdx,
          searchBarObj: {},
        });
        return;
      }
      if (this.$store.getters.searchBars[this.searchBarIdx].ip === this.ip) {
        return;
      }
      this.loading = true;
      const response = await this.$store.dispatch('fetchFilteredCountryData', {
        ip: this.ip,
        searchBarIdx: this.searchBarIdx,
      });
      response.error
        ? (this.errorMessage =
            'received error from GeoIp service: ' + response.message) &&
          (this.countryInfo = null)
        : (this.countryInfo = response) && (this.errorMessage = null);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.circle {
  height: 35px;
  width: 35px;
  background-color: rgb(221, 221, 221);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  bottom: 5px;
  left: 25px;
}
.search-bar-container {
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 7fr 2fr;
  align-items: baseline;
  grid-column-gap: 5px
}

.country-info {
  display: flex;
  align-items: baseline;
}
.flag {
  margin: auto;
  max-width: 40px;
  max-height: 20px;
}

.error-icon {
  top: 5px;
  left: 20px;
}
</style>
