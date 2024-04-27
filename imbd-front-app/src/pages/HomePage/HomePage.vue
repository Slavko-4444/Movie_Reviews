<template>
  <div>
      <the-show-scroll></the-show-scroll>
  </div>
</template>

<script>

import TheShowScroll from '@/components/movie_card/TheShowScroll.vue';

export default {
  components: {
    TheShowScroll
  },
  computed: {
    myVal() {
      return !!this.$store.getters.username
    }
  },

}
</script>
<style scoped>

</style>