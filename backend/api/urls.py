from django.urls import path, include
from .views import *

urlpatterns = [

    path('', home),
    path('api/', include('exercises.urls')),
    path('api/challenges/', challenge_list),

]