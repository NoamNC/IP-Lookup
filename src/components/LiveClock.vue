<template>
  <p class="clock">{{ time }}</p>
</template>

<script>
export default {
  name: 'LiveClock',
  props: {
    timeZoneName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      interval: null,
      time: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: this.timeZoneName,
      }).format();
    }, 1000);
  },
};
</script>

<style scoped>
.clock {
  margin: 0px 0px 0px 5px;
}
</style>
