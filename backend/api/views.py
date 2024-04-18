from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise


# Create your views here.

class CreatreUserView(generics.CreateAPIView):

    # specify the queryset on what object to be looking for
    queryset = User.objects.all()

    # what kind of data we need to accpet
    serializer_class = UserSerializer

    #  who can call this
    permission_classes = [AllowAny]


def exercise_list(request):
    # Get the difficulty level from the query parameters
    difficulty = request.GET.get('difficulty')

    # Filter the queryset based on the difficulty if it's provided
    if difficulty:
        exercises = Exercise.objects.filter(difficulty_level=difficulty)
    else:
        exercises = Exercise.objects.all()

 
    exercise_list = [{
        'title': exercise.title,
        'difficulty_level': exercise.get_difficulty_level_display(),  
        'description': exercise.description,
        'question': exercise.question,
        'answer': exercise.answer
    } for exercise in exercises]
    return JsonResponse(exercise_list, safe=False)