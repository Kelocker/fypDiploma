

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise
from django.db.models import Case, When, Value, IntegerField
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .utils import run_test_script
from rest_framework.permissions import AllowAny





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

    # Define the sort order for each difficulty level
    difficulty_sort_order = Case(
        When(difficulty_level='B', then=Value(1)),
        When(difficulty_level='I', then=Value(2)),
        When(difficulty_level='A', then=Value(3)),
        output_field=IntegerField(),
    )

    # Filter the queryset based on the difficulty if it's provided
    if difficulty:
        exercises = Exercise.objects.filter(difficulty_level=difficulty)
    else:
        exercises = Exercise.objects.all().annotate(sort_order=difficulty_sort_order).order_by('sort_order')

 
    exercise_list = [{
        'id': exercise.id,
        'title': exercise.title,
        'difficulty_level': exercise.get_difficulty_level_display(),  
        'description': exercise.description,
        'question': exercise.question,
        'test_script': exercise.test_script,
    } for exercise in exercises]
    return JsonResponse(exercise_list, safe=False)


@api_view(['POST'])
@permission_classes([AllowAny])
def execute_code(request, exercise_id):
    code = request.data.get('code')
    if not code:
        return Response({'error': 'No code provided'}, status=400)
    
    try:
        exercise = Exercise.objects.get(id=exercise_id)
        script_path = exercise.test_script
        filename = script_path
        filename.replace('_test', '')


        # Save user code to word_count.py
        with open(filename, 'w') as f:
            f.write(code)
        
        # Run the test script
        result = run_test_script(script_path)
        
        return Response(result)
    except Exercise.DoesNotExist:
        return Response({'error': 'Exercise not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)