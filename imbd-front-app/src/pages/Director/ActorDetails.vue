<template>
  <div class="container my-4" v-if="isHere">
    <worker-template :worker="actor"></worker-template>
    <div class="d-flex my-5">
      <div class="left" v-if="actor.movies.length">
        <h2 class='my-4'>Movies</h2>
        <slide-watchlist :watchlist="actor.movies" idSpec="movies"></slide-watchlist>
      </div>
      <div class="right mx-3" v-if="actor.series.length">
        <h2 class='my-4'>Series</h2>
        <slide-watchlist :watchlist="actor.series" id-spec="series"></slide-watchlist>
      </div>

    </div>
  </div>
  <div class="container my-5  alert alert-warning d-flex align-items-center" role="alert" v-else>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
      <path
        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
    </svg>
    <div class="mx-3">
      Actor not found for given credentials!
    </div>
  </div>
</template>

<script>
import api from '@/httpClient/api';
import WorkerTemplate from './WorkerTemplate.vue'
import SlideWatchlist from '../../components/ui/slideWatchlist.vue';
export default {
  components: { WorkerTemplate, SlideWatchlist },
  props: ['actorId'],
  watch: {
    actorId: function (newId) {
      this.callBack(newId)
    } 
  },
  provide(){
    return {
      goToM: this.seeMovie,
      goToS: this.seeSeries,
    }
  },
  computed: {
    isHere() {
      if (!this.actor)
        return false
      return this.actor.last_name ? true : false
    }
  },
  data() {
    return {
      actor: null
    };
  },
  methods: {
    seeMovie(getId) {
      this.$router.push({ path: '/show/details/show/' + getId })
    },
    seeSeries(getId) {
      this.$router.push({ path: '/show/details/tv-show/' + getId })
    },

    callBack(currentId) {
      this.actor = null
      if (parseInt(currentId))
        api(`show-worker/actor/detail/${parseInt(currentId)}`, 'get').then(res => {
          if (res.status === "service Error")
            this.actor = null
          else
            this.actor = res.data
        })
    }
  },
  created() {
    this.callBack(this.actorId)
  }
}
</script>

<style scoped></style>