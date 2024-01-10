#Lesson Teach Item
##Template:
```
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
            <h2 class="title">
                <a @click="$router.push('/course/teach/' + courseId)" class="link"> {{ courseName }} </a> /
                <a @click="$router.push('/course/teach/' + courseId + '/' + subjectId)" class="link"> {{ subjectName }} </a> /
                {{ lessonName }}
            </h2>
          </div>
          <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
          </div>
          <p>
            {{ content }}
          </p>
        </div>
    </div>
</template>
```

##Script:
```
<script>
import { store } from '@/main';
import axios from 'axios';


export default {
    data() {
        return {
            courseId: this.$route.params.courseId,
            courseName: null,
            subjectId: this.$route.params.subjectId,
            subjectName: null,
            lessonId: this.$route.params.lessonId,
            lessonName: null,
            content: null,
            message: ''
        };
    },
    mounted() {
        this.loadCourseName();
        this.loadSubjectName();
        this.loadLesson();
    },
    methods: {
        loadLesson() {
            return axios({
                url: 'http://127.0.0.1:8000/lessons/detail/' + this.lessonId,
                method: "GET",
                headers: {
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Get lesson', response.data);
                this.lessonName = response.data.name;
                this.content = response.data.content;
                this.message = '';
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        loadSubjectName() {
            return axios({
                url: 'http://127.0.0.1:8000/subjects/detail/' + this.subjectId,
                method: "GET",
                headers: {
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Get lessons', response.data);
                this.subjectName = response.data.name;
                this.message = '';
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        loadCourseName() {
            return axios({
                url: 'http://127.0.0.1:8000/courses/detail/' + this.courseId,
                method: "GET",
                headers: {
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Get subjects', response.data);
                this.courseName = response.data.name;
                this.message = '';
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        }
    }
};
</script>
```