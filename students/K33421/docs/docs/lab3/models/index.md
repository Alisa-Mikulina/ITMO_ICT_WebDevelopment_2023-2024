#Models

###Here are the models and their corresponding fields:

###Course:
  - name (CharField)
  - about_info (TextField)
  - thumbnail (ImageField)
  - subjects (property)
  
```
class Course(models.Model):
    name = models.CharField(max_length=128)
    about_info = models.TextField()
    thumbnail = models.ImageField(upload_to='course_photos', null=True)


    def __str__(self) -> str:
        return f'{self.name} - {str(self.about_info)})'

    class Meta:
        ordering = ['id']

    @property
    def subjects(self):
        return Subject.objects.filter(course=self)
    
    @property
    def students(self):
        return CourseStudent.objects.filter(course=self)
    
    @property
    def teachers(self):
        return CourseTeacher.objects.filter(course=self)
```

###User (extends AbstractUser):
  - profile_picture (ImageField)
  - country (CharField)
  - city (CharField)
  - about_info (TextField)
  - birthdate (DateTimeField)
  - social_media_link (CharField)
  - attending (property)
  - teaching (property)

```
class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_photos', default='profile_photos/user.svg')
    country = models.CharField(max_length=64, default='Russia', null=True, blank=True)
    city = models.CharField(max_length=64, default='Moscow', null=True, blank=True)
    about_info = models.TextField(default="A very interesting person", null=True, blank=True)
    birthdate = models.DateTimeField(null=True, blank=True)
    social_media_link = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.last_name} {self.first_name}'

    class Meta:
        ordering = ['last_name']

    @property
    def attending(self):
        return CourseStudent.objects.filter(user=self)
    
    @property
    def teaching(self):
        return CourseTeacher.objects.filter(user=self)
```

###CourseStudent:
  - course (ForeignKey to Course)
  - user (ForeignKey to User)

```
class CourseStudent(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'course')
```

###CourseTeacher:
  - course (ForeignKey to Course)
  - user (ForeignKey to User)

```
class CourseTeacher(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'course')

```

###Subject:
  - name (CharField)
  - about_info (TextField)
  - thumbnail (ImageField)
  - course (ForeignKey to Course)
  - lessons (property)

```
class Subject(models.Model):
    name = models.CharField(max_length=128)
    about_info = models.TextField()
    thumbnail = models.ImageField(upload_to='subject_photos', null=True, blank=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.name} - {str(self.about_info)})'

    class Meta:
        ordering = ['id']

    @property
    def lessons(self):
        return Lesson.objects.filter(subject=self)
```

###Lesson:
  - name (CharField)
  - content (TextField)
  - thumbnail (ImageField)
  - subject (ForeignKey to Subject)

```
class Lesson(models.Model):
    name = models.CharField(max_length=128)
    content = models.TextField()
    thumbnail = models.ImageField(upload_to='lesson_photos', null=True, blank=True)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.name} - {str(self.about_info)})'

    class Meta:
        ordering = ['id']
```

###Application:
  - course (ForeignKey to Course)
  - user (ForeignKey to User)
  - status (CharField)
  - apply_message (TextField)
  - reply_message (TextField)

```
class Application(models.Model):
    AWAITS = 'AW'
    APPROVED = 'AP'
    CANCELLED = 'CA'

    STATUS_CHOICES = (
        (AWAITS, 'Awaits'),
        (APPROVED, 'Approved'),
        (CANCELLED, 'Cancelled'),
    )

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS_CHOICES, max_length=2, default='AW')
    apply_message = models.TextField(null=True, blank=True)
    reply_message = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f'{str(self.status)} - {self.user} applied for the course: {str(self.course)}'

    class Meta:
        ordering = ['id']
```

###Completion:
  - user (ForeignKey to User)
  - course (ForeignKey to Course)
  - subject (ForeignKey to Subject)
  - lesson (ForeignKey to Lesson)

```
class Completion(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'course', 'subject', 'lesson')
```