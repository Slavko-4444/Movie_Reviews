<template>
  <div>
  <div class="card-text d-flex align-items-center justify-content-between mt-3">
    <div>
      <span class="favorite" @click="favoriteMovie()">
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
    </div>
    <!-- <div>
      <span class="badge badge text-bg-primary float-end p-2">New</span>
    </div> -->
  </div>
  <div v-if="showPopup" class="popup">
    <div class="popup-content">
      <h4>{{ popupMessage }}</h4>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</div>
</template>

<script>
import api from "@/httpClient/api";
export default {
  props: ["addFavorite"],
  data() {
    return {
      movieId: this.addFavorite(),
      showModal: false
    };
  },

  methods: {
    favoriteMovie() {
      api(`favorite/${this.$store.getters.userId}/list`,'post', {
            movie_id: this.movieId,
            series_id: null,
          }).then(res=>{
            if (res.status==='ok')
            alert("Movie added to Favorites!");
            else if (res.status==='service Error')
            if (res.data.data.non_field_errors)
              alert(res.data.data.non_field_errors)
      })
    },
  },
};
</script>

<style src="../movie_card/MovieCard.vue" scoped>
/* .popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
}
.popup-content {
  text-align: center;
} */
</style>
