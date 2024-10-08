from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UsedToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_exp = models.IntegerField(default=0)
    current_level = models.IntegerField(default=1)


#Lesson section
class Chapter(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()

class Lesson(models.Model):
    chapter = models.ForeignKey(Chapter, related_name='chapter', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()


class Topic(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    sublesson = models.ForeignKey('Lesson', related_name='topics', on_delete=models.CASCADE)



class Example(models.Model):
    description = models.TextField(null=True, blank=True)  
    code = models.TextField()
    is_executable = models.BooleanField(default=False)  
    topic = models.ForeignKey(Topic, related_name='examples', on_delete=models.CASCADE)

    
#Exercise section
class Exercise(models.Model):
    DIFFICULTY_LEVELS = [
        ('B', 'Beginner'),
        ('I', 'Intermediate'),
        ('A', 'Advanced'),
    ]
    title = models.CharField(max_length=200)
    difficulty_level = models.CharField(max_length=1, choices=DIFFICULTY_LEVELS)
    description = models.TextField()
    question = models.TextField()
    test_script = models.TextField()


class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    submitted_code = models.TextField()
    

# Challenge section
class Challenge(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    question = models.TextField()
    test_script = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class ChallengeSubmission(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rank = models.IntegerField()
    finished_time = models.DateTimeField(default=timezone.now)

# Progress section
class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

