<template>
  <div class="mt-5">
    <h4>Comments</h4>
    <hr class="my-4">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6 col-lg-12">
        <div class="card shadow-0 border" style="background-color: #f0f2f5;">
          <div class="card-body p-4">
            <add-comment-card :do-update="callEndPoint"></add-comment-card>
            <comment-card v-for="result in results" :key="result" :result="result" ></comment-card>
          </div>
        </div>
      </div>
    </div>
    <comment-paggination :noPages="pageNumbers" next="http://127.0.0.1:8000/comment/m/1/list?page=2" :re-load="updateResults" :page-id="currentPage" v-if="pageNumbers"></comment-paggination>
  </div>
</template>

<script>
import api from '@/httpClient/api';
import AddCommentCard from './AddCommentCard.vue';
import CommentCard from './CommentCard.vue'
import CommentPaggination from './CommentPaggination.vue';
export default {
  components: { CommentCard, AddCommentCard, CommentPaggination },
  inject: ['watchListId', 'typeOfRoute'],
  
  data() {
    return {
      results: [],
      pageNumbers: 0,
      currentPage: 1,
    };
  },
  methods: {
    callEndPoint(pageId=1){
      let urlPath = `comment/${this.typeOfRoute}/${this.watchListId}/list?page=${pageId}`
     
      api(urlPath).then(res => {
      if (res.status === "ok"){
        this.results = res.data.results
        this.pageNumbers = Math.round(res.data.count / this.results.length)
        this.currentPage = pageId
      }

    })
    
    },
    updateResults(pageId) {
      this.callEndPoint(pageId)
    }
  },
  created() {
    this.callEndPoint();
  },

  
}
</script>

<style></style>