<template>
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

    <v-btn href="https://github.com/NoamNC?tab=repositories" target="_blank" text class="btn-text shrink">
      <span class="side-text">Check out my other projects</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopBar',
};
</script>

<style lang="css" scoped>
.btn-text {
  display: inline-block;
  white-space: normal;
}
</style>
