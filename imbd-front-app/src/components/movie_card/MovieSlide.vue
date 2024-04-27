<template>
  <div class="w-75 m-auto">
    <div v-if="loading">
      <p>Loading data...</p>
    </div>
    <div v-else>
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else>
        <div class="container">
        
          <filter-movie @selectionChanged="handleGenreSelection"></filter-movie>
        </div>
        <div v-if="newMovies.length > 0" class="container">
          <div class="row">
            <div class="col-12">
              <h2 class="m-xl-2 my-4">New movies from 2024:</h2>
            </div>
          </div>

          <div class="row">
            <div class="col-9">
              <div class="card-group card-group-scroll">
                <movie-card
                  v-for="movie in newMovies"
                  :key="movie.id"
                  class="col-2 mx-3 my-2"
                  :movie="{
                    id: movie.id,
                    title: movie.title,
                    photo_url: movie.photo_url,
                    description: movie.description,
                    rating: movie.avg_rating,

                    director: {
                      first_name: movie.director.first_name,
                      last_name: movie.director.last_name,
                    },
                  }"
                  type="show"
                  @call-again="fetchAllShows"
                ></movie-card>
              </div>
            </div>
          </div>
        </div>

        <div v-if="newMovies.length > 0" class="container">
          <div class="row">
            <div class="col-12">
              <h2 class=" my-5">New series from 2024:</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-9">
              <div class="card-group card-group-scroll">
                <series-card
                  v-for="s in newSeries"
                  :key="s.id"
                  class="col-2 mx-3 my-2"
                  :series="{
                    id: s.id,
                    title: s.title,
                    photo_url: s.photo_url,
                    description: s.description,
                    rating: s.avg_rating,

                    director: {
                      first_name: s.director.first_name,
                      last_name: s.director.last_name,
                    },
                  }"
                  type="tv-show"
                  @call-again="fetchAllShows"
                ></series-card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="newMovies.length > 0" class="container">
        <h1 class="my-5">All Movies:</h1>
        <div class="row">
          <div class="col-9">
            <div class="card-group card-group-scroll">
              <movie-card
                v-for="movie in movies"
                :key="movie.id"
                class="col-2 mx-3 my-2"
                :movie="{
                  id: movie.id,
                  title: movie.title,
                  photo_url: movie.photo_url,
                  description: movie.description,
                  rating: movie.avg_rating,

                  director: {
                    first_name: movie.director.first_name,
                    last_name: movie.director.last_name,
                  },
                }"
                type="show"
                @call-again="fetchAllShows"
              ></movie-card>
            </div>
          </div>
        </div>
      </div>
      <div v-if="newMovies.length > 0" class="container">
        <h1 class="my-5">Popular:</h1>
        <div class="row">
          <div class="col-9">
            <div class="card-group card-group-scroll">
              <movie-card
                v-for="movie in mostPopular"
                :key="movie.id"
                class="col-2 mx-3 my-2"
                :movie="{
                  id: movie.id,
                  title: movie.title,
                  photo_url: movie.photo_url,
                  description: movie.description,
                  rating: movie.avg_rating,

                  director: {
                    first_name: movie.director.first_name,
                    last_name: movie.director.last_name,
                  },
                }"
                type="show"
                @call-again="fetchAllShows"
              ></movie-card>
            </div>
          </div>
        </div>
      </div>
      <div v-if="newMovies.length > 0" class="container">
        <h1 class="my-5">All Series:</h1>
        <div class="row">
          <div class="col-9">
            <div class="card-group card-group-scroll">
              <series-card
                v-for="movie in series"
                :key="movie.id"
                class="col-2 mx-3 my-2"
                :series="{
                  id: movie.id,
                  title: movie.title,
                  photo_url: movie.photo_url,
                  description: movie.description,
                  rating: movie.avg_rating,

                  director: {
                    first_name: movie.director.first_name,
                    last_name: movie.director.last_name,
                  },
                }"
                type="tv-show"
                @call-again="fetchAllShows"
              ></series-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "./MovieCard.vue";
import SeriesCard from "./SeriesCard.vue";
import FilterMovie from "../filter/FilterMovie.vue";

export default {
  components: {
    MovieCard,
    SeriesCard,
    FilterMovie,
  },

  data() {
    return {
      loading: true,
      error: null,
      movies: [],
      series: [],
      moviesCopy: [],
      newMovies: [],
      newSeries: [],
      allGenres: [],
      mostPopular: [],
    };
  },

  created() {
    this.filterMoviesByGenre();
  },

  mounted() {
    this.fetchAllShows();
  },

  methods: {
    fetchAllShows() {
      axios
        .get("http://127.0.0.1:8000/all-shows/")
        .then((response) => {
          this.movies = response.data.movie;
          this.moviesCopy = JSON.parse(JSON.stringify(this.movies));
          this.series = response.data.series;
          this.loading = false;
          this.newestMovies(response.data.movie, response.data.series);
          this.popularMovies(response.data.movie);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.error = "Failed to fetch data due to server error.";
          this.loading = false;
        });
    },

    newestMovies(movies, series) {
      this.newMovies = [];
      this.newSeries = [];
      for (let i of movies) {
        if (i.date_of_release.split("-")[0] == 2024) {
          this.newMovies.push(i);
        }
      }

      for (let i of series) {
        if (i.date_of_release.split("-")[0] == 2024) {
          console.log("Tu sam", i.avg_rating);
          this.newSeries.push(i);
        }
      }
    },

    popularMovies(allMovies) {
      this.mostPopular = [];
      for (let i of allMovies) {
        if (i.avg_rating >= 8.5) {
          this.mostPopular.push(i);
        }
      }
    },

    handleGenreSelection(selectedGenres) {
      if(selectedGenres && selectedGenres?.length > 0) {
        this.filterMoviesByGenre(selectedGenres);
      } else {
        this.movies = this.moviesCopy;
      }
    },

    filterMoviesByGenre(genres) {
      let param = "";
      for (const i in genres) {
        console.log(genres[i].genre_name, "aaaaaaaaaaaaaaaaaaaaaaa");
        param += genres[i].genre_name + ",";
      }
      console.log(param);
      axios
        .get(
          `http://127.0.0.1:8000/all-shows/movie-filter-genre/?genre=${param} `
        )
        .then((response) => {
          this.movies = response.data;
        });
    },
  },
};
</script>

<style scoped>
.body {
  padding-top: 2rem;
}

@media (min-width: 576px) {
  .card-group.card-group-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}

.card-group.card-group-scroll > .card {
  flex-basis: 35%;
}

.swiper {
  width: 400px;
  height: 400x;
  border: 1px solid black;
}
</style>
