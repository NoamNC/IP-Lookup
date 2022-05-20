<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn href="https://torq.io/" target="_blank" text>
          <v-img
            alt="Torq logo"
            class="shrink"
            contain
            min-width="100"
            src="https://torq.io/wp-content/uploads/2021/06/torq-blck.png"
            width="100"
          />
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/NoamNC"
        target="_blank"
        text
        class="btn-text shrink"
      >
        <span class="side-text">Checkout my other projects</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <IpLookup />
    </v-main>
  </v-app>
</template>

<script>
import IpLookup from './components/IpLookup.vue';
export default {
  name: 'App',
  components: {
    IpLookup,
  },
};
</script>

<style>
.v-btn {
  text-transform: none;
}

.btn-text {
  display: inline-block;
  white-space: normal;
}
</style>
