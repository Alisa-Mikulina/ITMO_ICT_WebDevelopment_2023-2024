#Subject Teach Item
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
        <div id="content" class="content">
          <div class="add-row">
            <div class="vertical-center">
                <h2 class="title">
                    <a @click="$router.push('/course/teach/' + courseId)" class="link"> {{ courseName }} </a>
                    / {{ subjectName }}
                </h2>
            </div>
            <div class="apply-button-box">
                <button @click="addLesson()" class="add-button">Add lesson</button>
            </div>
          </div>
          <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
          </div>

          <div v-for="lesson in lessons" :key="lesson.id" class="list-item">
              <div class="list-item-info">
                <img v-bind:src="lesson.thumbnail" class="course-img">
                <div class="form-group vertical-center">
                  <span>{{ lesson.name }}</span>
                  <span>{{ lesson.about_info }}</span>
                </div>
              </div>
              <div class="buttons-box">
                <div class="apply-button-box">
                    <button @click="viewLesson(lesson.id)" class="apply-button">View</button>
                </div>
                <div class="apply-button-box">
                    <button @click="editLesson(lesson.id)" class="edit-button">Edit</button>
                </div>
                <div class="apply-button-box">
                    <button @click="processDelete(lesson.id)" class="delete-button">Delete</button>
                </div>
              </div>
          </div>
        </div>
        <div id="form-view" class="form-object">
            <div class="card card-container inner-block"> 
                <h2>{{ lessonId ? "Edit" : "Add"}} lesson</h2>
                <form @submit.prevent="loginUser" :validation-schema="schema" >
                    <div class="form-group vertical-center">
                    <label for="name">Name</label>
                    <input name="name" type="text" class="form-control" v-model="lessonName" placeholder="Lesson name" required />
                </div>
                <div class="form-group vertical-center">
                    <label for="about">Content</label>
                    <textarea name="about" class="form-control" v-model="lessonContent" placeholder="Lesson content" required />
                </div>
                <div class="form-group vertical-center">
                    <label for="picture">Picture</label>
                    <input name="picture" type="file" class="form-control" v-on:change="handleThumbnailLoad" required />
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

                    <button @click="lessonId ? processEdit() : processAdd()" class="btn btn-primary btn-block" style="width: 40%" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Save</span>
                    </button>
                </div>
                </form>
            </div>
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
            courseId: this.$route.params.courseId,
            courseName: null,
            subjectId: this.$route.params.subjectId,
            subjectName: null,
            lessons: [],
            lessonId: null,
            lessonName: '',
            lessonContent: '',
            lessonThumbnail: null,
            message: ''
        };
    },
    mounted() {
        this.loadCourseName();
        this.loadLessons();
    },
    methods: {
        loadLessons() {
            return axios({
                url: 'http://127.0.0.1:8000/subjects/detail/' + this.subjectId,
                method: "GET",
                headers: {
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Get lessons', response.data);
                this.subjectName = response.data.name;
                this.lessons = response.data.lessons;
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
        },

        viewLesson(lessonId) {
            router.push({ path: '/course/teach/' + this.courseId + "/" + this.subjectId + "/" + lessonId});
        },

        addLesson() {
            document.getElementById("content").style.display = "none";
            document.getElementById("form-view").style.display = "flex";
        },

        editLesson(lessonId) {
            this.addLesson();
            var lesson = this.lessons.filter(function (s) { return s.id == lessonId })[0]
            this.lessonId = lessonId;
            this.lessonName = lesson.name;
            this.lessonContent = lesson.content;
        },

        cancelAction() {
            document.getElementById("content").style.display = "block";
            document.getElementById("form-view").style.display = "none";
        },

        processAdd() {
            return axios({
                url: 'http://127.0.0.1:8000/lessons/create/',
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + store.state.authToken
                },
                data: {
                    name: this.lessonName,
                    content: this.lessonContent,
                    thumbnail: this.lessonThumbnail,
                    subject: this.subjectId
                }
            }).then((response) => {
                console.log('Added lesson', response.data);
                this.message = '';
                this.cancelAction();
                this.loadLessons();
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        processEdit() {
            return axios({
                url: 'http://127.0.0.1:8000/lessons/update/' + this.lessonId,
                method: "PATCH",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + store.state.authToken
                },
                data: {
                    name: this.lessonName,
                    content: this.lessonContent,
                    thumbnail: this.lessonThumbnail,
                    subject: this.subjectId
                }
            }).then((response) => {
                console.log('Edited lessons', response.data);
                this.message = '';
                this.cancelAction();
                this.loadLessons();
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        processDelete(lessonId) {
            return axios({
                url: 'http://127.0.0.1:8000/lessons/delete/' + lessonId,
                method: "DELETE",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Delete lesson', response.data);
                this.message = '';
                this.loadLessons();
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        handleThumbnailLoad(event) {
            const target = event.target;
            if (target && target.files) {
                this.lessonThumbnail = target.files[0];
            }
            console.log("Thumb loaded", this.lessonThumbnail);
        }
    }
};
</script>
```