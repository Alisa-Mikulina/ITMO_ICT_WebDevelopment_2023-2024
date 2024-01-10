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
                <h2 class="title">{{ courseName }} </h2>
            </div>
            <div class="apply-button-box">
                <button @click="addSubject()" class="add-button">Add subject</button>
            </div>
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
              <div class="buttons-box">
                <div class="apply-button-box">
                    <button @click="viewSubject(subject.id)" class="apply-button">View</button>
                </div>
                <div class="apply-button-box">
                    <button @click="editSubject(subject.id)" class="edit-button">Edit</button>
                </div>
                <div class="apply-button-box">
                    <button @click="processDelete(subject.id)" class="delete-button">Delete</button>
                </div>
              </div>
          </div>
        </div>
        <div id="form-view" class="form-object">
            <div class="card card-container inner-block"> 
                <h2>{{ subjectId ? "Edit" : "Add"}} subject</h2>
                <form @submit.prevent="loginUser" :validation-schema="schema" >
                    <div class="form-group vertical-center">
                    <label for="name">Name</label>
                    <input name="name" type="text" class="form-control" v-model="subjectName" placeholder="Subject name" required />
                </div>
                <div class="form-group vertical-center">
                    <label for="about">About info</label>
                    <textarea name="about" class="form-control" v-model="subjectAboutInfo" placeholder="About subject" required />
                </div>
                <div class="form-group vertical-center">
                    <label for="picture">Picture</label>
                    <input v-on="subjectThumbnail" name="picture" type="file" class="form-control" v-on:change="handleThumbnailLoad" required />
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

                    <button @click="subjectId ? processEdit() : processAdd()" class="btn btn-primary btn-block" style="width: 40%" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Save</span>
                    </button>
                </div>
                </form>
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
            subjectId: null,
            subjectName: '',
            subjectAboutInfo: '',
            subjectThumbnail: null,
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
            router.push({ path: '/course/teach/' + this.courseId + "/" + subjectId })
        },

        addSubject() {
            document.getElementById("content").style.display = "none";
            document.getElementById("form-view").style.display = "flex";
        },

        editSubject(subjectId) {
            this.addSubject();
            var subject = this.subjects.filter(function (s) { return s.id == subjectId })[0]
            this.subjectId = subjectId;
            this.subjectName = subject.name;
            this.subjectAboutInfo = subject.about_info;
        },

        cancelAction() {
            document.getElementById("content").style.display = "block";
            document.getElementById("form-view").style.display = "none";
        },

        processAdd() {
            return axios({
                url: 'http://127.0.0.1:8000/subjects/create/',
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + store.state.authToken
                },
                data: {
                    name: this.subjectName,
                    about_info: this.subjectAboutInfo,
                    thumbnail: this.subjectThumbnail,
                    course: this.courseId
                }
            }).then((response) => {
                console.log('Added subject', response.data);
                this.message = '';
                this.cancelAction();
                this.loadSubjects();
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        processEdit() {
            return axios({
                url: 'http://127.0.0.1:8000/subjects/update/' + this.subjectId,
                method: "PATCH",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + store.state.authToken
                },
                data: {
                    name: this.subjectName,
                    about_info: this.subjectAboutInfo,
                    thumbnail: this.subjectThumbnail,
                    course: this.courseId
                }
            }).then((response) => {
                console.log('Edited subject', response.data);
                this.message = '';
                this.cancelAction();
                this.loadSubjects();
            }).catch((err) => {
                console.error('Error logging in:', err);
                err = JSON.parse(err.request.response);
                var values = Object.keys(err).map(function (key) { return err[key]; });
                this.message = values[0];
            });
        },

        processDelete(subjectId) {
            return axios({
                url: 'http://127.0.0.1:8000/subjects/delete/' + subjectId,
                method: "DELETE",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + store.state.authToken
                }
            }).then((response) => {
                console.log('Delte subject', response.data);
                this.message = '';
                this.loadSubjects();
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
                this.subjectThumbnail = target.files[0];
            }
            console.log("Thumb loaded", this.subjectThumbnail);
        }
    }
};
</script>