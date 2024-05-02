from django.contrib import admin

# Register your models here.
from .models import TrackStatus, ExerciseFiles

admin.site.register(TrackStatus)
admin.site.register(ExerciseFiles)