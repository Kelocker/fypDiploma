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

class Quiz(models.Model):
    lesson = models.ForeignKey(Lesson, related_name='lesson', on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField()


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
    answer = models.TextField()
    

#Ranking section

class CodeSnippet(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    code = models.TextField()
    quiz = models.ForeignKey('Quiz', on_delete=models.CASCADE, null=False)  # Default should be a valid quiz ID
    result = models.TextField(null=True, blank=True)  # Add this line

class Ans(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    code = models.TextField()

class Result(models.Model):
    snippet = models.ForeignKey(CodeSnippet, on_delete=models.CASCADE, related_name='results')
    output = models.TextField()