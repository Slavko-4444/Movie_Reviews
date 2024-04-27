<template>
  <auth-card>
    <form @submit.prevent="submitForm">
      <h1 class="h3 mb-3 fw-normal">Create Account</h1>
      <div class="d-flex justify-content-between">
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="mark@yahoo.com" v-model.trim="email">
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput2" placeholder="mark.smith12"
            v-model.trim="username">
          <label for="floatingInput2">Username</label>
        </div>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Password</label>
      </div>
      <p class="mb-3 px-2  text-muted">8 or more characters</p>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword1" placeholder="Password"
          v-model="passwodConfirm">
        <label for="floatingPassword1">Confirm password</label>
      </div>
      <div class="alert alert-danger" role="alert" v-if="!isValid">
        {{ formMessage }}
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
    </form>
  </auth-card>
</template>

<script>
import api from '@/httpClient/api';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      username: '',
      password: '',
      passwodConfirm: '',
      email: '',
      formMessage: '',
      isValid: true,
    };
  },

  methods: {
    submitForm() {
      this.isValid = true
      this.formMessage = ''
      if (this.username === '' || this.password === '' || this.passwodConfirm === '' || this.email === '') {
        this.isValid = false
        this.formMessage = 'Please fill all the fields!'
        return;
      }
      if (this.username.length < 4) {
        this.isValid = false
        this.formMessage = 'Username is too short!'
        return;
      }
      if (this.passwodConfirm !== this.password) {
        this.isValid = false
        this.formMessage = 'Password do not match!'
        return;
      }

      let data = {
        username: this.username,
        password: this.password,
        email: this.email,
        password_confirm: this.passwodConfirm
      }

      api('user/registration', 'post', data).then(res => {
        if (res.status === 'ok' && res.data.s_message) {
          let regMessage = res.data.s_message
          toast.success(regMessage, {
            autoClose: 1500,
            position: toast.POSITION.TOP_RIGHT,
            toastStyle: {
              fontSize: '1.4rem'
            },
          });
          setTimeout(() => this.$router.replace('/login'), 2000)
        }
        else if (res.status === 'service Error') {
          this.isValid = false
          this.formMessage = res.data.data.error
        }
        else {
          let info = res.data
          if (info.username)
            this.formMessage = info.username[0]
          if (info.password)
            this.formMessage = info.password[0]
          if (info.email)
            this.formMessage = info.email[0]

          this.isValid = false
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