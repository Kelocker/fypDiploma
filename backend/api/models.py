from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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
    description = models.TextField()
    test_script = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class ChallengeSubmission(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rank = models.IntegerField()

# Progress section
class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

