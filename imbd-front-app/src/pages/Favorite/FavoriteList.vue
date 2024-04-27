<template>
  <div class="container main-box" v-if="!loginErrMessage">
    <h1>{{ toSee }}</h1>
    <hr>
    <div class="d-flex justify-content-end">
      <a class="btn btn-primary text-right" @click="switchToSee">See {{ toSee === 'Movies' ? 'Series' : 'Movies' }}</a>
    </div>
      <FavoriteMovies :movies="movies" v-if="toSee === 'Movies'" />
  
    <FavoriteSeries :series="series" v-else />
  </div>
  <div class="container alert alert-warning my-4" role="alert" v-else>
    {{ loginErrMessage }}
  </div>
</template>

<script>
import api from '@/httpClient/api'
import FavoriteMovies from './favoriteMovies.vue'
import FavoriteSeries from './FavoriteSeries.vue'

export default {
  components: {
    FavoriteMovies,
    FavoriteSeries,
  },
  data() {
    return {
      toSee: 'Movies',
      movies: null,
      series: null,
      loginErrMessage: null,
    }
  },
  methods: {
    switchToSee() {
      if (this.toSee === "Movies")
        this.toSee = "Series"
      else
        this.toSee = "Movies"
    },
  },
  created() {

    let userId = this.$store.getters.userId;
    this.loginErrMessage = null
    api(`http://127.0.0.1:8000/favorite/${userId}/list`, 'get').then(res => {
      if (res.status === 'login Error')
        this.loginErrMessage = 'Token expired'
      else if (res.data.series && res.data.movies) {
        this.movies = res.data.movies
        this.series = res.data.series
      }
    })
  }
}
</script>

<style scoped>
.main-box {
  padding: 5vh;
}
</style>