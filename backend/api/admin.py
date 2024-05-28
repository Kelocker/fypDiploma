from django.contrib import admin
from .models import UserProfile, Lesson, Chapter, Exercise, Submission, Challenge, ChallengeSubmission, Progress
# from .models import TrackStatus, ExerciseFiles


# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Lesson)
admin.site.register(Exercise)
admin.site.register(Chapter)
admin.site.register(Submission)
admin.site.register(Challenge)
admin.site.register(ChallengeSubmission)
admin.site.register(Progress)
# admin.site.register(TrackStatus)
# admin.site.register(ExerciseFiles)

