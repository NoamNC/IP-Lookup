<template>
  <v-card class="container">
    <div class="top-section">
      <h3>IP Lookup</h3>
      <v-spacer></v-spacer>
      <v-btn icon @click="reset">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </div>

    <v-divider />
    <div class="bottom-section">
      <p>Enter one or more IP addresses and get their country</p>
      <v-btn color="primary" @click="addASearchBar">
        <v-icon> mdi-plus </v-icon> Add
      </v-btn>
      <v-divider class="divider" />
      <IpSearchbar
        v-for="(item, index) in searchBars"
        :key="index"
        :searchBarIdx="index"
      />
    </div>
  </v-card>
</template>

<script>
import IpSearchbar from './IpSearchbar.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'IpLookup',
  components: {
    IpSearchbar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      searchBars: 'searchBars',
    }),
  },
  methods: {
    addASearchBar() {
      this.$store.commit('addSearchBarData', {searchBarObj:{}});
    },
    reset() {
      this.$store.commit('reset');
    },
  },
  created(){
    this.addASearchBar()
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  min-height: 200px;
  margin: 40px auto;
}
.top-section {
  padding: 20px;
  display: flex;
  align-items: baseline;
}

.divider {
  margin: 20px 0px;
}

.bottom-section {
  padding: 20px;
}
@media only screen and (max-width: 425px) {
  /*Small smartphones [325px -> 425px]*/
  .bottom-section,
  .top-section {
    padding: 40px;
  }
}
.v-btn {
  width: 100px;
  display: flex;
  justify-content: space-evenly;
}
</style>
