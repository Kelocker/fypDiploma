from django.contrib import admin
from .models import UserProfile, Lesson, Chapter, Quiz, Exercise


# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Lesson)
admin.site.register(Chapter)
admin.site.register(Quiz)
admin.site.register(Exercise)

