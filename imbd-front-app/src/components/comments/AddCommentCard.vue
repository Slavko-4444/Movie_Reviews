<template>
    <div data-mdb-input-init class="form-outline mb-4" v-if="!loginErrMessage">
        <div class="container alert alert-success my-4" role="alert" v-if="successMessage">
        {{ successMessage }}
      </div>
        <input type="text" id="addANote" class="form-control" placeholder="Type comment..." v-model="content" @keyup.enter="createComment"/>
        <label class="form-label" for="addANote">+ Add a note</label>
    </div>
    <div class="container alert alert-warning my-4" role="alert" v-else>
    {{ loginErrMessage }}
  </div>
</template>

<script>
import api from '@/httpClient/api'

export default {
    inject: ['watchListId', 'typeOfRoute'],
    props: ['doUpdate'],
    data(){
        return {
            loginErrMessage: null,
            content: '',
            successMessage: null,
        }
    },
    methods: {
        isLoggedIn() {
                this.loginErrMessage = null
            if (!this.$store.getters.isAuthenticated)
                this.loginErrMessage = 'You must be logged in to comment...'                                
        },
        createComment(){
            this.successMessage = null
            this.loginErrMessage = null
            const dataRequest = {
                user_id: this.$store.getters.userId,
                content: this.content
            }
            api(`comment/${this.typeOfRoute}/${this.watchListId}/list`, 'post', dataRequest).then(res=>{
                if (res.status === 'login Error')
                this.loginErrMessage = 'Token expired'
            else if (res.status === 'service Error'){
                this.loginErrMessage = 'Service is busy right now!'
            }
            else {
                this.successMessage = 'Comment successfuly pubulished'
                setTimeout(()=>{
                    this.successMessage = null
                    this.content = null
                    this.doUpdate()
                }, 2500)
                }
            })
   
        }
    },
    created(){
        this.isLoggedIn()
    }
}
</script>

<style></style>