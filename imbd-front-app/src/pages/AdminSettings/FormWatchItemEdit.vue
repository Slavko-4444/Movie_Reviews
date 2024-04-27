<template>
  <div class="container border bd-2 rounded p-3 mt-5">
    <h3 class="h3 text-center">Edit</h3>

    <form class="my-3" @submit.prevent="submitForm">
      <div class="row mb-3">
        <label for="title" class="col-sm-2  col-form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="specWatch.title" placeholder="Enter movie title">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" v-model="specWatch.description" rows="3"
          placeholder="Enter movie description"></textarea>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input class="form-control" type="file" id="image" accept="image/*" @change="handleFileChange">

      </div>
      <div class="mb-3" v-if="who === 'movie'">
        <label for="num" class="form-label">Length</label>
        <input class="form-control" type="number" id="num" v-model="specWatch.movie_length">
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <a class="btn btn-dark mx-3 text-right" @click="remove()">Delete!</a>
        </div>
        <a class="btn btn-danger text-right" @click="$emit('close-item', who)">Close</a>
      </div>
    </form>
    <br>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import api, { baseUrl } from '@/httpClient/api';
import axios from 'axios';


export default {
  props: ['watchlist', 'who'],
  watch: {
    watchlist() { }
  },
  data() {
    return {
      specWatch: this.watchlist,
      url: this.who === 'movie' ? 'all-shows/show/detail/' + this.watchlist.id : 'all-shows/tv-show/detail/' + this.watchlist.id
    };
  },
  methods: {
    handleFileChange(event) {
      let file = event.target.files || event.dataTransfer.files;
      const formData = new FormData();
      formData.append('photo_url', file[0]);
      this.specWatch.image = formData;
    },
    callToasInfo(infoStatus) {
      let to = 'info'
      let message = "Successfully updated"
      this.$emit('close-item', this.who)
      if (infoStatus === "service Error") {
        to = 'error'
        message = 'Bad Request'
      }

      toast[to](message, {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT,
        toastStyle: {
          fontSize: '1rem'
        },
      });
      this.$emit('reloadPage')
    },
    editWithOutImage(requestData) {
      api(this.url, 'put', requestData).then(res => {
        console.log('res ', res)
        this.callToasInfo(res.status)
      })
    },
    remove() {
      api(this.url, 'delete').then(res => {
        this.callToasInfo(res.status)
      })

    },
    submitForm() {
      const requestData = {
        title: this.specWatch.title,
        movie_length: this.specWatch.movie_length,
        description: this.specWatch.description,
      }


      if (this.specWatch.image) {
        axios.put(baseUrl + 'all-shows/show/detail/' + this.specWatch.id, this.specWatch.image, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.status == 200)
            this.editWithOutImage(requestData)
        }).catch(() =>
          {
            toast('Bad Image format', {
              autoClose: 1500,
              position: toast.POSITION.TOP_RIGHT,
              toastStyle: {
                fontSize: '1rem'
              },
            })
          }
        )
      } else
        this.editWithOutImage(requestData)
    }
  }
}
</script>

<style></style>
