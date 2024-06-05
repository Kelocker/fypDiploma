from django.urls import path
from .views import *
from django.urls import path, include




urlpatterns = [

    path('', home),
    path('api/', include('exercises.urls')),
]