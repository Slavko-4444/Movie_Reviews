<template>
  <div class="container">
    <div class="w-75">
    <div>
      <div class="row g-1">
        <div class="col-4">
          <img :src="image" class="img-fluid mt-4 offset-1 rounded-3" style="margin-top: 6px;margin-left: 16px;" alt="Show image" />
        </div>
        <div class="col-8">
          <div class="card-body pt-4 px-5 ">
            <h3 class="card-title">{{ title }} 
              <span class="ml-1 badge rounded-pill bg-warning fs-6 text-uppercase float-end badge " v-for="genre in genre" :key="genre.id">
                {{ genre.genre_name + " " }}
              </span></h3>
            <h6 class="pt-4 card-subtitle fw-bold fs-5">Description</h6>
            <p class="card-text pt-1">
              {{ description }}
            </p>
            <h6 class="pt-4 card-subtitle fw-bold fs-5">Director</h6>
            <p>{{ director.first_name + " " + director.last_name }}</p>

            <h6 class="pt-4 card-subtitle fw-bold fs-5">Actors</h6>
            <div v-for="(actor) in actors" :key="actor.id">
              <span class="card-text">
                {{ actor.first_name + " " + actor.last_name }}
                <br>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <comments-list></comments-list>
  </div>
</template>

<script>
import axios from "axios";
import CommentsList from '../../components/comments/CommentsList.vue';

export default {
  components: { CommentsList },
  props: ["id", "type"],
  provide() {
    return{
      watchListId: this.id,
      typeOfRoute: this.type === 'tv-show'?'s':'m'
    }
  },
  data() {
    return {
      title: "",
      description: "",
      image: "",
      director: "",
      actors: [],
      genre: [],
      movieLength: "",
    };
  },
  watch: {
    id: function (newId) {
      this.fetchCardDetails(this.type,newId)
    },
    type: function (newType) {
      this.fetchCardDetails(newType, this.id)
    }
  },
  mounted() {
    this.fetchCardDetails(this.type, this.id);
  },

  methods: {
    fetchCardDetails(newType, newId) {
      axios
        .get(`http://127.0.0.1:8000/all-shows/${newType}/detail/${newId}`)
        .then((response) => {
          this.title = response.data.title;
          this.description = response.data.description;
          this.image = response.data.photo_url;
          this.director = response.data.director;
          this.actors = response.data.actor;
          this.genre = response.data.genre;
        })
        .catch((error) => {
          this.error = "Failed to fetch data: " + error.message;
          this.loading = false;
        });
    },




  },
};
</script>

<style scoped>
.badge {
  margin-left: 10px;
}




</style>
