import './assets/main.css'
import'./assets/courses.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'

// Create a new store instance.
export const store = createStore({
    state () {
      return {
        authToken: '',
        username: ''
      }
    },
    mutations: {
      setToken (state, token) {
        state.authToken = token;
      },
      setUsername (state, username) {
        state.username = username;
      }
    }
})

const app = createApp(App);

app.use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app');