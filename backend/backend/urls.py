"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import CreatreUserView, exercise_list, challenge_list, challenge_results, user_challenge_attempt_checker, get_user_details, get_challenge, ChapterViewSet, LessonViewSet, TopicViewSet, ExampleViewSet, execute_code
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from api.views import UpdateUserView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreatreUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/exercises/', exercise_list, name='exercise-list'),
    path('api/challenges/', challenge_list, name='challenge-list'),
    path('api/challenge-results/', challenge_results, name='challenge-results'),
    path('users/reset_password/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('users/reset_password_confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('api/chapters/', ChapterViewSet.as_view({'get': 'list'}), name='chapter-list'),
    path('api/chapters/<int:chapterId>/', ChapterViewSet.as_view({'get': 'retrieve'}), name='chapter-detail'),
    path('api/sublesson/', LessonViewSet.as_view()),
    path('api/sublesson/<int:sublesson_id>/', LessonViewSet.as_view()),
    path('api/topics/', TopicViewSet.as_view()),
    path('api/topics/<int:pk>/', TopicViewSet.as_view()),
    path('api/examples/', ExampleViewSet.as_view()),
    path('api/examples/<int:pk>/', ExampleViewSet.as_view()),
    path('api/execute_code/<str:test_type>/<int:test_id>/', execute_code, name='execute_code'),
    path('api/user/', UpdateUserView.as_view(), name='user-update'),
    path('api/user-details/', get_user_details, name='get_user_details'),
    path('api/check-attempt/<str:username>/<int:challenge_id>/', user_challenge_attempt_checker, name='check-attempt'),
    path('api/challenges/<int:id>/', get_challenge, name='get_challenge'),
]
