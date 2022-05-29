<template>
  <div class="search-bar-container">
    <div class="circle">
      <span>{{ searchBarIdx + 1 }}</span>
    </div>
    <v-text-field
      v-model="ip"
      label="IP address"
      dense
      outlined
      single-line
      clearable
      :disabled="loading"
      :rules="[rules.ip]"
      @click:clear="clearSearchbar(null)"
      @blur="doLookup"
    ></v-text-field>
    <v-progress-circular
      size="25"
      class="loader"
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div v-if="!loading" class="country-info">
      <v-tooltip bottom v-if="countryInfo || errorMessage">
        <template v-slot:activator="{ on: on }">
          <img
            v-if="countryInfo"
            v-on="on"
            :src="countryInfo.flagUrl"
            alt="flag"
            class="flag"
          />
          <v-icon v-if="errorMessage" v-on="on" color="error" class="error-icon">
            mdi-alert-circle
          </v-icon>
        </template>
        <span v-if="errorMessage">{{ errorMessage }}</span>
        <span v-if="countryInfo">{{ countryInfo.name }}</span>
      </v-tooltip>
      <LiveClock v-if="countryInfo" :timeZoneName="countryInfo.timeZoneName" />
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
    clearSearchbar(ip) {
      this.ip = ip;
      ip && this.rules.ip(ip);
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
    async doLookup() {
      if (!this.ip || !this.isIp(this.ip)) {
        this.clearSearchbar(this.ip);
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
        ? (this.errorMessage = response.message) && (this.countryInfo = null)
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
  grid-column-gap: 5px;
}

.country-info {
  display: flex;
  align-items: baseline;
}
.flag {
  margin: auto;
  width: 40px;
  height: 20px;
}

.error-icon {
  top: 5px;
  left: 20px;
}
</style>
