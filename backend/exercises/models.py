from django.db import models

class TrackStatus(models.Model):
    concept_exercises = models.BooleanField(default=False)
    test_runner = models.BooleanField(default=False)
    representer = models.BooleanField(default=False)
    analyzer = models.BooleanField(default=False)

class ExerciseFiles(models.Model):
    solution = models.TextField()
    test = models.TextField()
    editor = models.TextField(null=True, blank=True)
    exemplar = models.TextField(null=True, blank=True)
