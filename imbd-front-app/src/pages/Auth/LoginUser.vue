<template>
  <auth-card>
    <form @submit.prevent="submitForm">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="mark.smith12" v-model.trim="username">
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Password</label>
      </div>
      <div class="alert alert-danger" role="alert" v-if="!isValid">
        {{ formMessage }}
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  </auth-card>
</template>

<script>
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      username: '',
      password: '',
      formMessage: '',
      isValid: true,
      loginMessage: ''
    };
  },

  methods: {
    submitForm() {
      this.isValid = true
      this.formMessage = ''
      if (this.username === '' || this.password === '') {
        this.isValid = false
        this.formMessage = 'Please fill all the fields!'
        return;
      }
      if (this.username.length < 4) {
        this.isValid = false
        this.formMessage = 'Username is too short!'
        return;
      }
      let data = {
        username: this.username,
        password: this.password
      }

      this.$store.dispatch('login', data).then(res => {

        if (res.username) {
          this.loginMessage = 'Welcome ' + res.username

          toast.success(this.loginMessage, {
            autoClose: 1500,
            position: toast.POSITION.TOP_RIGHT,
            toastStyle: {
              fontSize: '1.4rem'
            },
          });
          setTimeout(() => this.$router.replace('/home'), 2000)

        }
        else {
          this.isValid = false
          this.formMessage = res.data.detail
        }
      })
    }
  }
}
</script>

<style scoped>
input {
  margin: 1rem 0;
}
</style>