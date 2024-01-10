#Registration Form
##Template:
```
<template>
  <div class="auth">
    <div class="card card-container inner-block"> 
      <h2>Registration</h2>
      <Form @submit.prevent="registerUser" :validation-schema="schema" >
        <div class="form-group vertical-center">
          <label for="email">Email</label>
          <input name="email" type="text" class="form-control" v-model="email" placeholder="Email" />
        </div>
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
            <span>Register</span>
          </button>
        </div>
        <div class="form-group">
          <router-link to="/login">
            <span>Already have an account?</span>
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
      email: '',
      message: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        var response = await axios.post('http://127.0.0.1:8000/auth/users/', {
            username: this.username,
            password: this.password,
            email: this.email,
        });
        console.log('User registered successfully!', response.data);

        response = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
            username: this.username,
            password: this.password
        });
        const token = response.data.auth_token;

        store.commit('setToken', token);
        store.commit('setUsername', this.username);
        router.push({ path: '/main' });

        console.log('User logged in successfully!', response.data);
      } catch (error) {
        console.error('Error registering user:', error);
        var err = JSON.parse(error.request.response);
        var values = Object.keys(err).map(function (key) { return err[key][0]; });
        this.message = values[0];
      }
    }
  }
};
</script>
```