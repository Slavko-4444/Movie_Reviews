<template>
  <div class="card-text d-flex align-items-center justify-content-between mt-3">
    <span class="favorite" @click="favoriteMovie()">
      Add
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137" />
      </svg>
    </span>

    <!-- <span class="badge badge text-bg-primary float-end p-2">New</span> -->
  </div>
</template>

<script>
import api from "@/httpClient/api";
export default {
  props: ["addFavorite"],
  data() {
    return {
      seriesId: this.addFavorite(),
    };
  },

  methods: {
    favoriteMovie() {
      api(`favorite/${this.$store.getters.userId}/list`, 'post', 
      {
        movie_id: null,
        series_id: this.seriesId,
      }).then(res => {
        if (res.status === 'ok')
          alert("Series added to Favorites!");
        else if (res.status === 'service Error')
          if (res.data.data.non_field_errors)
            alert("Already added")
      })
    },
  },
};
</script>

<style src="../movie_card/MovieCard.vue" scoped></style>
