<template>
    <div class="auth">
      <div class="card card-container inner-block"> 
        <h2>Profile</h2>
        <div>
          <div class="form-group vertical-center">
            <label for="email">Email</label>
            <input name="email" type="text" class="form-control" v-model="email" placeholder="Email" required />
          </div>
          <div class="form-group vertical-center">
            <label for="username">Username</label>
            <input name="username" type="text" class="form-control" v-model="username" placeholder="Username" required />
          </div>
          <div class="form-group vertical-center">
            <label for="firstname">First Name</label>
            <input name="firstname" type="text" class="form-control" v-model="firstname" placeholder="First Name" />
          </div>
          <div class="form-group vertical-center">
            <label for="lastname">Last Name</label>
            <input name="lastname" type="text" class="form-control" v-model="lastname" placeholder="Last Name" />
          </div>
          <div class="form-group vertical-center">
            <label for="password">Password</label>
            <input name="password" type="password" class="form-control" v-model="password" placeholder="Password" required />
          </div>

          <div class="form-group">            
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>

          <div class="form-buttons">
                <button @click="cancelAction()" class="btn btn-secondary btn-block" style="width: 40%" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Cancel</span>
                </button>

                <button @click="processEdit()" class="btn btn-primary btn-block" style="width: 40%" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Save</span>
                </button>
            </div>
          </div>
      </div>
    </div>
  </template>

<script>
import { store } from '@/main';
import router from '@/router';
import axios from 'axios';

export default {
  data() {
    return {
        userId: null,
        email: '',
        username: store.state.username,
        firstname: '',
        lastname: '',
        password: '',
        message: ''
    };
  },
  mounted() {
    this.getUserId().then(
        this.loadProfile
    );
  },

  methods: {
    async getUserId() {
        return axios({
            url: 'http://127.0.0.1:8000/id/', 
            method: "GET",
            headers: {
                'Authorization': "Token " + store.state.authToken
            }
        }).then((response) => {
            console.log('Get user', response.data);
            this.userId = response.data.id;
            this.message = '';
        }).catch((err) => {
            console.error('Error getting user:', err);

            err = JSON.parse(err.request.response);
            var values = Object.keys(err).map(function (key) { return err[key]; });
            this.message = values[0];
        })
    },

    async loadProfile() {
        return axios({
            url: 'http://127.0.0.1:8000/users/detail/' + this.userId, 
            method: "GET",
            headers: {
              'Authorization': "Token " + store.state.authToken
            }
        }).then((response) => {
            console.log('Get user', response.data);
            this.userId = response.data.id;
            this.email = response.data.email;
            this.firstname = response.data.first_name;
            this.lastname = response.data.last_name;
            this.message = '';
        }).catch((err) => {
            console.error('Error getting user:', err);

            err = JSON.parse(err.request.response);
            var values = Object.keys(err).map(function (key) { return err[key]; });
            this.message = values[0];
        })
    },

    async processEdit() {
        return axios({
            url: 'http://127.0.0.1:8000/users/update/' + this.userId, 
            method: "PATCH",
            headers: {
                'Authorization': "Token " + store.state.authToken
            },
            data: {
                email: this.email,
                username: this.username,
                first_name: this.firstname,
                last_name: this.lastname,
                password: this.password,
            }
        }).then((response) => {
            console.log('Update user', response.data);
            this.message = '';
            alert("Profile updated!");
            this.cancelAction();
        }).catch((err) => {
            console.error('Error getting user:', err);

            err = JSON.parse(err.request.response);
            var values = Object.keys(err).map(function (key) { return err[key]; });
            this.message = values[0];
        })
    },

    cancelAction() {
        router.push({ path: '/main' })
    }
  }
};
</script>