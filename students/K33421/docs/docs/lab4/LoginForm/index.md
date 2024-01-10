#Login Form
##Template:
```
<template>
    <div class="auth">
      <div class="card card-container inner-block"> 
        <h2>Login</h2>
        <Form @submit.prevent="loginUser" :validation-schema="schema" >
          <div class="form-group vertical-center">
            <label for="username">Username</label>
            <input name="username" type="text" class="form-control" v-model="username" placeholder="Username" />
            
          </div>
          <div class="form-group vertical-center">
            <label for="password">Password</label>
            <input name="password" type="password" class="form-control" v-model="password" placeholder="Password" />
          </div>

          <div class="form-group">            
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>

          <div class="form-group vertical-center">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span>
            </button>
          </div>
          
          <div class="form-group">
            <router-link to="/register">
                <span>Don't have an account?</span>
            </router-link>
          </div>
        </Form>
      </div>
    </div>
  </template>
```

##Script:
```
<script>
import { store } from '@/main';
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
          username: this.username,
          password: this.password
        });

        // Save JWT token in local storage
        const token = response.data.auth_token; // Assuming the JWT token is returned as 'access'

        store.commit('setToken', token);
        store.commit('setUsername', this.username);
        router.push({ path: '/main' });

        console.log('User logged in successfully!', response.data);
      } catch (error) {
        console.error('Error logging in:', error);
        var err = JSON.parse(error.request.response);
        var values = Object.keys(err).map(function (key) { return err[key][0]; });
        this.message = values[0];
      }
    }
  }
};
</script>
```