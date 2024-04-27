<template>
  <div v-if="isHere">
    <movie-favorite-card v-for="ser in series" :key="ser" :movie="ser"></movie-favorite-card>
  </div>
  <div class="d-inline my-4 alert alert-warning" role="alert" v-else>
      No favorite series yet!
  </div>
</template>

<script>
import MovieFavoriteCard from '../../components/ui/MovieFavoriteCard.vue';
export default {
  components: { MovieFavoriteCard },
  props: ['series'],
  computed: {
    isHere(){
      if(!this.series)
      return false
      return this.series.length?true:false
    }
  }
}
</script>

<style></style>