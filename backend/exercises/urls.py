# exercises/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExerciseFilesViewSet

router = DefaultRouter()
router.register(r'exercises', ExerciseFilesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('exercises/<int:exercise_id>/run_tests/', run_tests, name='run_tests'),

]
