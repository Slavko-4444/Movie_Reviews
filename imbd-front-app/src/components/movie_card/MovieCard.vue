<template>
  <div :id="this.movie.id" class="card rounded-3" @click="setId(this.movieId)" v-if="this.movie">
    <div class="h-100 zoom-effect">
      <router-link :to="{
    name: 'ShowDetails',
    params: { id: this.movie.id, type: this.type },
  }">
        <img :src="this.containsLocalhostURL(this.movie.photo_url)
      ? this.movie.photo_url: 'http://127.0.0.1:8000' + this.movie.photo_url
    " class="card-img-top h-100" alt="Show poster" />
      </router-link>
    </div>

    <div class="card-body">
      <h5 class="card-title">
        {{ this.movie.title }}
      </h5>

      <div class="d-flex align-items-center">
        <div class="card-text">
          <div class="d-flex flex-row align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" class="rating mr-2">
              <path fill="currentColor"
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327l4.898.696c.441.062.612.636.282.95l-3.522 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <span class="pt-1 mx-1">{{ this.movie.rating.toFixed(1) }}</span>

            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" class="rate_star"
              data-bs-toggle="modal" :data-bs-target="`#myModal${this.movie.id}`" v-if="$store.getters.isAuthenticated">
              <path fill="currentColor"
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73l3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356l-.83 4.73zm4.905-2.767l-3.686 1.894l.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575l-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957l-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
            <span class="pt-1 mx-1">{{ this.movie.rate }}</span>
            <!-- The Modal -->
            <div class="modal" :id="`myModal${this.movie.id}`">
              <div class="modal-dialog">
                <div class="modal-content w-100">
                  <!-- Modal Header -->
                  <div class="modal-header container">
                    <h4 @click="console.log(this.movieId)" class="modal-title">
                      Leave your rating
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <!-- Modal body -->
                  <div class="modal-body" v-if="isLogged()" @click="console.log(this.movie)">
                    <star-rating :rating="rating" :max-rating="10" :star-size="20" :active-color="orange"
                      @update:rating="setRating"></star-rating>
                  </div>
                  <div v-else>You must be logged in!</div>

                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="sendRating">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- For adding favorite -->
      <!-- <div
        class="card-text d-flex align-items-center justify-content-between mt-3"
        v-if="isLogged()"
      >
        <span class="favorite">
          Add
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137"
            />
          </svg>
        </span>

        <span class="badge badge text-bg-primary float-end p-2">New</span>
      </div>
      <div v-else>
        <span class="badge badge text-bg-primary float-end p-2">New</span>
      </div> -->

      <div class="" v-if="isLogged()">
        <favorite-movie :add-favorite="addFavorite" @click="addFavorite">
        </favorite-movie>
      </div>
      <!-- <div v-else>
        <span class="badge badge text-bg-primary float-end p-2">New</span>
      </div> -->
    </div>
    <div class="card-footer">
      <small class="text-muted" v-if="this.movie.director">Director:
        <a href="#">{{ this.movie.director.first_name }}
          {{ this.movie.director.last_name }}</a></small>
      <small class="text-muted" v-else>
        No director information available
      </small>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import FavoriteMovie from "../add_favorite/FavoriteMovie.vue";
import api from "@/httpClient/api";

export default {
  props: ["movie", "type"],

  components: {
    StarRating,
    FavoriteMovie,
  },

  data() {
    return {
      rating: 0,
      movieId: this.movie.id,
      showType: "",
      timer: "",
    };
  },
  watch: {
    movie() {

    }
  },
  mounted() {
    this.isLogged();
  },

  methods: {
    containsLocalhostURL(inputString) {
      return inputString.includes('http://127.0.0.1:8000');
    },
    setRating(rating) {
      this.rating = rating;
    },

    setId(id) {
      this.movieId = id;
      console.log(this.movieId);
    },

    isLogged() {
      if (this.$store.getters.userId != null) {
        return true;
      } else {
        return false;
      }
    },

    sendRating() {
      if (this.type == "show") {
        api(`favorite/rating-m/${this.movieId}/list`, 'post',
          {
            user: this.$store.getters.userId,
            rating: this.rating,
          }).then(res => {
            if (res.status === 'ok') {
              this.$emit('call-again')
              alert("Thanks for rating!");
            }
            else if (res.status === 'service Error')
              if (res.data.data.non_field_errors)
                alert("Already rated")
          })

      }
    },

    addFavorite() {
      return this.movie.id;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.card-img-top {
  height: 300px;
  object-fit: cover;
}

.card-title {
  margin-bottom: 10px;
  font-size: 1.25rem;
}

.card-text {
  margin-bottom: 15px;
}

.card-footer {
  background-color: #f8f9fa;
  padding: 10px 15px;
}

.director-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.director-link:hover {
  text-decoration: underline;
}

.zoom-effect {
  overflow: hidden;
}

.zoom-effect img {
  transition: transform 0.3s ease-in-out;
}

.zoom-effect:hover img {
  transform: scale(1.1);
}

.rating {
  color: rgb(250, 175, 37);
  margin-right: 10px;
}

.rate_star {
  margin-left: 40px;
}

.rate_star:hover {
  color: orange;
  border-radius: 100%;
  box-shadow: rgb(255, 169, 64) 0 0 20px;
}

.favorite {
  display: inline-block;
  padding: 2px 7px;
  background: orange;
  border-radius: 10%;
}

.favorite:hover {
  background: rgb(255, 169, 64);
  color: aliceblue;
  transform: scale(1.1);
}

/* Star component */

.modal-dialog {
  width: 1000px;
}
</style>
../add_favorite/TheFavorite.vue../add_favorite/FavoriteMovie.vue
