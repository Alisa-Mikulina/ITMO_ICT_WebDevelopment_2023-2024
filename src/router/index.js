import CoursesPage from "@/components/CoursesPage.vue";
import CourseItem from "@/components/CourseItem.vue";
import CourseTeachItem from "@/components/CourseTeachItem.vue";
import SubjectItem from "@/components/SubjectItem.vue";
import SubjectTeachItem from "@/components/SubjectTeachItem.vue";
import LessonItem from "@/components/LessonItem.vue";
import LessonTeachItem from "@/components/LessonTeachItem.vue";
import RegistrationForm from '@/components/RegistrationForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import ProfilePage from "@/components/ProfilePage.vue";
import {createRouter, createWebHistory} from "vue-router";
import { store } from "../main"


const routes = [  // массив с роутами
   // отдельный роут: 
   {
        path: '/profile',
        component: ProfilePage, 
        meta: {
            requiresAuth: true
        }
    },
   {
        path: '/course/teach/:courseId/:subjectId/:lessonId',
        component: LessonTeachItem, 
        meta: {
            requiresAuth: true
        }
    },
   {
        path: '/course/teach/:courseId/:subjectId',
        component: SubjectTeachItem, 
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/course/teach/:courseId',
        component: CourseTeachItem, 
        meta: {
            requiresAuth: true
        }
    },
   {
        path: '/course/my/:courseId/:subjectId/:lessonId',
        component: LessonItem, 
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/course/my/:courseId/:subjectId',
        component: SubjectItem, 
        meta: {
            requiresAuth: true
        }
    },
   {
        path: '/course/my/:courseId',
        component: CourseItem, 
        meta: {
            requiresAuth: true
        }
   },
   {
       path: '/main', // конкретный url-адрес
       component: CoursesPage, // Ссылка на компонент
       meta: {
         requiresAuth: true
       }
    },
    {
        name: 'register',
        path: '/register', 
        component: RegistrationForm 
    },
    {
        name: 'login',
        path: '/login', 
        component: LoginForm 
    },
    {
        path: '/',
        redirect: '/login'
    },
]

const router = createRouter({
   history: createWebHistory(), routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.authToken) {
            next({ path: '/login' })
        } else {
            next() // go to wherever I'm going
        }
    } else {
        next() // does not require auth, make sure to always call next()!
    }
})

export default router // экспортируем сконфигурированный роутер