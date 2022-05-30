<template>
  <v-app>
    <NavBar />
    <v-main>
      <IpLookup />
    </v-main>
  </v-app>
</template>

<script>
import IpLookup from './components/IpLookup.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    IpLookup
  },
};
</script>

<style>
.v-btn {
  text-transform: none;
}


</style>
