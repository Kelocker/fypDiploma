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
from api.views import CreatreUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import exercise_list
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from api import views
from api.views import CompilerView
from api.views import test_results_view
from api.views import ChapterListView, ChapterDetailView, LessonDetailView, LessonListView, SubLessonListView
from api.views import QuizDetailView
from api.views import AnsDetailView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreatreUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/exercises/', exercise_list, name='exercise-list'),
    path('users/reset_password/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('users/reset_password_confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('api/code-snippets/', views.CompilerView.as_view(), name='code-snippet-list-create'),
    # this link store the result temporarily
    path('api/test-results/', test_results_view, name='test-results'),
    path('api/chapters/', ChapterListView.as_view(), name='chapter-list'),
    path('api/chapters/<int:pk>/', ChapterDetailView.as_view(), name='chapter-detail'),
    path('api/sublesson/', SubLessonListView.as_view(), name='sublesson-list'),

    # path('api/sublesson/', LessonListView.as_view(), name='lesson-list'),
    path('api/sublesson/<int:pk>/', LessonDetailView.as_view(), name='lesson-detail'),

    path('api/quiz/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),
    path('api/ans/', AnsDetailView.as_view(), name='ans-detail')

]
