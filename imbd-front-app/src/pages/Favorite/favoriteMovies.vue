<template>
  <div v-if="isHere">
    <movie-favorite-card v-for="movie in movies" :key="movie" :movie="movie"></movie-favorite-card>
  </div>
  <div class="d-inline alert alert-warning my-4" role="alert" v-else>
    No favorite movies yet!
  </div>
</template>

<script>
import MovieFavoriteCard from '../../components/ui/MovieFavoriteCard.vue'


export default {
  components: { MovieFavoriteCard },
  props: ['movies'],
  computed: {
    isHere() {
      if(!this.movies)
        return false

        return this.movies.length?true : false
    }
  }
}
</script>

<style scoped></style>