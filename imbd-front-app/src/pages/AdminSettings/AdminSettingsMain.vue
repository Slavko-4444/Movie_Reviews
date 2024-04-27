<template>
  <div class="container my-4">

    <div class="my-4 d-flex flex-column flex-md-row">
      <a class="btn btn-primary mx-2" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button"
        aria-expanded="false" aria-controls="multiCollapseExample1">Movies table</a>
      <button class="btn btn-primary mx-2" type="button" data-bs-toggle="collapse"
        data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Series
        table</button>
      <button class="btn btn-primary mx-2" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse"
        aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2" @click="measureClicks()">See
        both tables</button>
    </div>
    <div class="row">
      <div :class="'col' + spreadTable">
        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <div class="card card-body">
            <h4>Movies</h4>
            <movie-edit :watch-list="movies" type-info="movie" @edit-info="callEditForm"></movie-edit>
          </div>
        </div>
      </div>
      <div :class="'col' + spreadTable">
        <div class="collapse multi-collapse" id="multiCollapseExample2">
          <div class="card card-body">
            <h4>Series</h4>
            <movie-edit :watch-list="series" type-info="series" @edit-info="callEditForm"></movie-edit>
          </div>
        </div>
      </div>
    </div>

    <!-- edit watchlist -->
    <form-watch-item-edit :watchlist="editItem" who="movie" v-if="editMovie" @close-item="closeEditForm" @reload-page="callData"></form-watch-item-edit>
    <form-watch-item-edit :watchlist="editItem" who="series" v-if="editSerie" @close-item="closeEditForm" @reload-page="callData"></form-watch-item-edit>

    <!-- add watchlist -->
    <form-watch-item-add @reload-page="callData"></form-watch-item-add>
  </div>
</template>

<script>
import api from '@/httpClient/api';
import MovieEdit from './MovieEdit.vue'
import FormWatchItemAdd from './FormWatchItemAdd.vue';
import FormWatchItemEdit from './FormWatchItemEdit.vue';
export default {
  components: { MovieEdit, FormWatchItemAdd, FormWatchItemEdit },
  data() {
    return {
      shellWe: {
        do: false,
        noClick: 0,
      },
      movies: null,
      series: null,
      loginErrMessage: null,
      editSerie: false,
      editMovie: false,
      editItem: null,
    }
  },
  computed: {
    spreadTable() {
      if (!this.shellWe.do)
        return `col-sm-12 col-md-12`;
      return '';
    }
  },
  methods: {
    closeEditForm(whatchItem) {
      if (whatchItem === 'series')
        this.editSerie = false
      else
        this.editMovie = false
    },
    callEditForm(whatchItem) {
      this.editItem = whatchItem.item
      this.editSerie = false
      this.editMovie = false

      if (whatchItem.who === 'series')
        this.editSerie = true
      else
        this.editMovie = true
    },

    measureClicks() {
      if (!this.shellWe.noClick) {
        this.shellWe.noClick++;
        this.shellWe.do = true
      }
      else
        setTimeout(() => {
          this.shellWe.noClick = 0
          this.shellWe.do = false
        }, 500)
    },

    callData(){
      api('all-shows/show').then(res=>{
        if (res.status === 'ok')
          this.movies = res.data        
      })
      api('all-shows/tv-show').then(res=>{
        if (res.status === 'ok')
          this.series = res.data        
      })
    },

  },
  created(){
    this.callData();
  }
}
</script>

<style scoped></style>