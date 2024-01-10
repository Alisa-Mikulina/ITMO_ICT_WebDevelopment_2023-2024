<template>
    <div class="table-view">
        <div class="menu-bar">
            <div class="side-bar">
            <ul>
                <li class="vertical-center menu-option" style="margin: 0">
                    <router-link to='/main' style="text-align: center;">
                        <button class="menu-button">
                            <h4>All courses</h4>
                        </button>
                    </router-link>
                </li>
                <li class="vertical-center menu-option" style="margin: 0">
                    <router-link to='/main?page=my' style="text-align: center;">
                        <button class="menu-button">
                            <h4>My courses</h4>
                        </button>
                    </router-link>
                </li>
                <li class="vertical-center menu-option" style="margin: 0">
                    <router-link to='/main?page=applied' style="text-align: center;">
                        <button class="menu-button">
                            <h4>Applied courses</h4>
                        </button>
                    </router-link>
                </li>
                <li class="vertical-center menu-option" style="margin: 0">
                    <router-link to='/main?page=teaching' style="text-align: center;">
                        <button class="menu-button">
                            <h4>Teaching courses</h4>
                        </button>
                    </router-link>
                </li> 
            </ul>
            </div>
            <div class="vertical-center menu-option">
            <router-link to='/profile' style="text-align: center;">
                <button class="menu-button">
                <h4>{{ $store.state.username }}</h4>
                </button>
            </router-link>
            </div>
        </div>  
       
        <div class="content">
          <div class="vertical-center">
            <h2 class="title">{{ courseName }} </h2>
          </div>
          <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
          </div>

          <div v-for="subject in subjects" :key="subject.id" class="list-item">
              <div class="list-item-info">
                <img v-bind:src="subject.thumbnail" class="course-img">
                <div class="form-group vertical-center">
                  <span>{{ subject.name }}</span>
                  <span>{{ subject.about_info }}</span>
                </div>
              </div>
              <div class="apply-button-box">
                <button @click="viewSubject(subject.id)" class="apply-button">View</button>
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
            courseId: this.$route.params.courseId,
            courseName: null,
            subjects: [],
            message: ''
        };
    },
    mounted() {
        this.loadSubjects();
    },
    methods: {
        loadSubjects() {
            return axios({
                url: 'http://127.0.0.1:8000/courses/detail/' + this.courseId,
                method: "GET",
                headers: {
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Get subjects', response.data);
                this.courseName = response.data.name;
                this.subjects = response.data.subjects;
                this.message = '';
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        viewSubject(subjectId) {
            router.push({ path: '/course/my/' + this.courseId + "/" + subjectId })
        }
    }
};
</script>