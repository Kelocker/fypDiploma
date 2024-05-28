from django.contrib import admin
from .models import UserProfile, Lesson, Chapter, Quiz, Exercise
# from .models import TrackStatus, ExerciseFiles


# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Lesson)
admin.site.register(Chapter)
admin.site.register(Quiz)
admin.site.register(Exercise)
# admin.site.register(TrackStatus)
# admin.site.register(ExerciseFiles)

