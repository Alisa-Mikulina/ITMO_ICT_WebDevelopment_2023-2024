<template>
    <div class="table-view">
      <div class="menu-bar">
        <div class="side-bar">
          <ul>
            <li class="vertical-center menu-option" style="margin: 0">
            <button @click="switchAllCoursesPage" class="menu-button">
              <h4>All courses</h4>
            </button>
          </li>
          <li class="vertical-center menu-option" style="margin: 0">
            <button @click="switchStudentCoursesPage" class="menu-button">
              <h4>My courses</h4>
            </button>
          </li>
          <li class="vertical-center menu-option" style="margin: 0">
            <button @click="switchAppliedCoursesPage" class="menu-button">
              <h4>Applied courses</h4>
            </button>
          </li>
          <li class="vertical-center menu-option" style="margin: 0">
            <button @click="switchTeachingCoursesPage" class="menu-button">
              <h4>Teaching courses</h4>
            </button>
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
            <h2 class="title">{{ currentPage }} courses</h2>
          </div>
          <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
          </div>

          <div v-for="course in courses" :key="course.id" class="list-item">
              <div class="list-item-info">
                <img v-bind:src="course.thumbnail" class="course-img">
                <div class="form-group vertical-center">
                  <span>{{ course.name }}</span>
                  <span>{{ course.about_info }}</span>
                </div>
              </div>
              <div v-if="!appliedCourses.includes(course.id) && !approvedCourses.includes(course.id) & currentPage == 'All'" class="apply-button-box">
                  <button @click="applyCourse(course.id)" class="apply-button">Apply</button>
              </div>
              <div v-if="currentPage == 'My'" class="apply-button-box">
                  <button @click="viewCourse(course.id)" class="apply-button">View</button>
              </div>
              <div v-if="currentPage == 'Teaching'" class="apply-button-box">
                  <button @click="viewTeachingCourse(course.id)" class="apply-button">View</button>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import { store } from '@/main';
import router from '@/router';

import axios from 'axios';

const allCoursesURL = "courses/";
const myCoursesURL = "courses/attending";
const teachingCoursesURL = "courses/teaching";
const coursesURLs = {
  "All": allCoursesURL,
  "My": myCoursesURL,
  "Teaching": teachingCoursesURL
}


export default {
  data() {
    return {
      currentPage: 'All',
      courses: [],
      appliedCourses: [],
      approvedCourses: [],
      message: ''
    };
  },
  mounted() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let page = urlParams.get('page');

    if (page == 'applied') this.switchAppliedCoursesPage();
    else {
      if (page == 'my') {
        this.switchStudentCoursesPage();
      } else if (page == 'teaching') {
        this.switchTeachingCoursesPage();
      } else this.switchAllCoursesPage();
      this.loadApplications();
    }
  },
  methods: {
    switchAllCoursesPage() {
      this.currentPage = 'All';
      this.loadCourses();
    },
    switchStudentCoursesPage() {
      this.currentPage = 'My';
      this.loadCourses();
    },
    switchAppliedCoursesPage() {
      this.currentPage = 'All';
      this.loadCourses().then(
        this.loadApplications().then(() => {
          console.log("Check");
          this.currentPage = 'Applied';

          let appliedCourses = this.appliedCourses;
          console.log("Check");
          this.courses = this.courses.filter(function (course) { 
            return appliedCourses.includes(course.id);
          });
          console.log(this.courses)
        })
      );
    },
  
    switchTeachingCoursesPage() {
      this.currentPage = 'Teaching';
      this.loadCourses();
    },

    loadCourses() {
      return axios({
        url: 'http://127.0.0.1:8000/' + coursesURLs[this.currentPage], 
        method: "GET",
        headers: {
          'Authorization': "Token " + store.state.authToken
        }
      }).then((response) => {
          console.log('Get courses', response.data);
          this.courses = response.data;
          this.message = '';
      }).catch((err) => {
        console.error('Error logging in:', err);

        err = JSON.parse(err.request.response);
        var values = Object.keys(err).map(function (key) { return err[key]; });
        this.message = values[0];
      })
    },

    loadApplications() {
      return axios({
        url: 'http://127.0.0.1:8000/applications/my/', 
        method: "GET",
        headers: {
          'Authorization': "Token " + store.state.authToken
        }
      }).then((response) => {
          console.log('Get applications', response.data);

          this.appliedCourses = [];
          this.approvedCourses = [];
          response.data.forEach(application => {
            if (application.status == 'AW') {
              this.appliedCourses.push(application.course);
            } else if (application.status == 'AP') {
              this.approvedCourses.push(application.course);
            }
          });

          this.message = '';
          console.log("Applied", this.appliedCourses);
          console.log("Approved", this.approvedCourses);
      }).catch((err) => {
        console.error('Error logging in:', err);

        err = JSON.parse(err.request.response);
        var values = Object.keys(err).map(function (key) { return err[key]; });
        this.message = values[0];
      })
    },


    applyCourse(courseId) {
      axios({
        url: 'http://127.0.0.1:8000/applications/create/', 
        method: "POST",
        headers: {
          'Authorization': "Token " + store.state.authToken
        },
        data: {
          course: courseId
        }
      }).then((response) => {
          console.log('Successful application', response.data);

          this.loadApplications();

          alert("You've successfuly applied to this course!");

      }).catch((err) => {
        console.error('Error logging in:', err);

        err = JSON.parse(err.request.response);
        var values = Object.keys(err).map(function (key) { return err[key]; });
        this.message = values[0];
      })
    },

    viewCourse(courseId) {
      router.push({ path: '/course/my/' + courseId });
    },

    viewTeachingCourse(courseId) {
      router.push({ path: '/course/teach/' + courseId });
    }
  }
};
</script>