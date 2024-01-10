# URLs

The urls.py file in my Django project defines the URL patterns for routing HTTP requests to the corresponding views.

## Users
```
    path('users/', UserList.as_view()),
    path('users/create/', UserCreate.as_view()),
    path('users/detail/<int:pk>', UserDetail.as_view()),
    path('users/update/<int:pk>', UserUpdate.as_view()),
    path('users/delete/<int:pk>', UserDelete.as_view()),
```
###**List Users**
  - URL: /users/
  - Method: GET
  - View: UserList
  - Description: Retrieves a list of users.

###**Create User**
  - URL: /users/create/
  - Method: POST
  - View: UserCreate
  - Description: Creates a new user.

###**User Detail**
  - URL: /users/detail/<int:pk>/
  - Method: GET
  - View: UserDetail
  - Description: Retrieves details of a specific user.

###**Update User**
  - URL: /users/update/<int:pk>/
  - Method: PUT
  - View: UserUpdate
  - Description: Updates an existing user.

###**Delete User**
  - URL: /users/delete/<int:pk>/
  - Method: DELETE
  - View: UserDelete
  - Description: Deletes a user.

## Courses
```
    path('courses/', CourseList.as_view()),
    path('courses/create/', CourseCreate.as_view()),
    path('courses/detail/<int:pk>', CourseDetail.as_view()),
    path('courses/update/<int:pk>', CourseUpdate.as_view()),
    path('courses/delete/<int:pk>', CourseDelete.as_view()),
```
###**List Courses**
  - URL: /courses/
  - Method: GET
  - View: CourseList
  - Description: Retrieves a list of courses.

###**Create Course**
  - URL: /courses/create/
  - Method: POST
  - View: CourseCreate
  - Description: Creates a new course.

###**Course Detail**
  - URL: /courses/detail/<int:pk>/
  - Method: GET
  - View: CourseDetail
  - Description: Retrieves details of a specific course.

###**Update Course**
  - URL: /courses/update/<int:pk>/
  - Method: PUT
  - View: CourseUpdate
  - Description: Updates an existing course.

###**Delete Course**
  - URL: /courses/delete/<int:pk>/
  - Method: DELETE
  - View: CourseDelete
  - Description: Deletes a course.

## Course Students
```
    path('courses/students/', CoursesStudents.as_view()),
    path('courses/addstudent/', CourseStudentCreate.as_view()),
    path('courses/removestudent/<int:pk>', CourseStudentDelete.as_view()),
```
###**List Course Students**
  - URL: /courses/students/
  - Method: GET
  - View: CoursesStudents
  - Description: Retrieves a list of course students.

###**Add Course Student**
  - URL: /courses/addstudent/
  - Method: POST
  - View: CourseStudentCreate
  - Description: Adds a student to a course.

###**Remove Course Student**
  - URL: /courses/removestudent/<int:pk>/
  - Method: DELETE
  - View: CourseStudentDelete
  - Description: Removes a student from a course.

## Course Teachers
```
    path('courses/teachers/', CoursesTeachers.as_view()),
    path('courses/addteacher/', CourseTeacherCreate.as_view()),
    path('courses/removeteacher/<int:pk>', CourseTeacherDelete.as_view()),
```
###**List Course Teachers**
  - URL: /courses/teachers/
  - Method: GET
  - View: CoursesTeachers
  - Description: Retrieves a list of course teachers.

###**Add Course Teacher**
  - URL: /courses/addteacher/
  - Method: POST
  - View: CourseTeacherCreate
  - Description: Adds a teacher to a course.

###**Remove Course Teacher**
  - URL: /courses/removeteacher/<int:pk>/
  - Method: DELETE
  - View: CourseTeacherDelete
  - Description: Removes a teacher from a course.

## Subjects
```
    path('subjects/', SubjectList.as_view()),
    path('subjects/create/', SubjectCreate.as_view()),
    path('subjects/detail/<int:pk>', SubjectDetail.as_view()),
    path('subjects/update/<int:pk>', SubjectUpdate.as_view()),
    path('subjects/delete/<int:pk>', SubjectDelete.as_view()),
```
###**List Subjects**
  - URL: /subjects/
  - Method: GET
  - View: SubjectList
  - Description: Retrieves a list of subjects.

###**Create Subject**
  - URL: /subjects/create/
  - Method: POST
  - View: SubjectCreate
  - Description: Creates a new subject.

###**Subject Detail**
  - URL: /subjects/detail/<int:pk>/
  - Method: GET
  - View: SubjectDetail
  - Description: Retrieves details of a specific subject.

###**Update Subject**
  - URL: /subjects/update/<int:pk>/
  - Method: PUT
  - View: SubjectUpdate
  - Description: Updates an existing subject.

###**Delete Subject**
  - URL: /subjects/delete/<int:pk>/
  - Method: DELETE
  - View: SubjectDelete
  - Description: Deletes a subject.

## Lessons
```
    path('lessons/', LessonList.as_view()),
    path('lessons/create/', LessonCreate.as_view()),
    path('lessons/detail/<int:pk>', LessonDetail.as_view()),
    path('lessons/update/<int:pk>', LessonUpdate.as_view()),
    path('lessons/delete/<int:pk>', LessonDelete.as_view()),
```
###**List Lessons**
  - URL: /lessons/
  - Method: GET
  - View: LessonList
  - Description: Retrieves a list of lessons.

###**Create Lesson**
  - URL: /lessons/create/
  - Method: POST
  - View: LessonCreate
  - Description: Creates a new lesson.

###**Lesson Detail**
  - URL: /lessons/detail/<int:pk>/
  - Method: GET
  - View: LessonDetail
  - Description: Retrieves details of a specific lesson.

###**Update Lesson**
  - URL: /lessons/update/<int:pk>/
  - Method: PUT
  - View: LessonUpdate
  - Description: Updates an existing lesson.

###**Delete Lesson**
  - URL: /lessons/delete/<int:pk>/
  - Method: DELETE
  - View: LessonDelete
  - Description: Deletes a lesson.

## Applications
```
    path('applications/', ApplicationList.as_view()),
    path('applications/create/', ApplicationCreate.as_view()),
    path('applications/review/<int:pk>', ApplicationReview.as_view()),
    path('applications/detail/<int:pk>', ApplicationDetail.as_view()),
    path('applications/update/<int:pk>', ApplicationUpdate.as_view()),
    path('applications/delete/<int:pk>', ApplicationDelete.as_view()),
```
###**List Applications**
  - URL: /applications/
  - Method: GET
  - View: ApplicationList
  - Description: Retrieves a list of applications.

###**Create Application**
  - URL: /applications/create/
  - Method: POST
  - View: ApplicationCreate
  - Description: Creates a new application.

###**Review Application**
  - URL: /applications/review/<int:pk>/
  - Method: PUT
  - View: ApplicationReview
  - Description: Reviews an application.

###**Application Detail**
  - URL: /applications/detail/<int:pk>/
  - Method: GET
  - View: ApplicationDetail
  - Description: Retrieves details of a specific application.

###**Update Application**
  - URL: /applications/update/<int:pk>/
  - Method: PUT
  - View: ApplicationUpdate
  - Description: Updates an existing application.

###**Delete Application**
  - URL: /applications/delete/<int:pk>/
  - Method: DELETE
  - View: ApplicationDelete
  - Description: Deletes an application.

These URL patterns map the appropriate URLs to the corresponding views in your app. They define the endpoints that can be accessed through HTTP requests and specify which views should be executed for each request.