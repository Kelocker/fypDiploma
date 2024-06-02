import json
import subprocess
import os

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise, Challenge
from django.db.models import Case, When, Value, IntegerField
from rest_framework.views import APIView
from .models import Chapter, Lesson, Topic, Example
from .serializers import ChapterSerializer, LessonSerializer, TopicSerializer, ExampleSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import AllowAny





# Create your views here.

class CreatreUserView(generics.CreateAPIView):

    # specify the queryset on what object to be looking for
    queryset = User.objects.all()

    # what kind of data we need to accpet
    serializer_class = UserSerializer

    #  who can call this
    permission_classes = [AllowAny]

    
    
class UpdateUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print("Validation Errors:", serializer.errors)  # Add this line for debugging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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






class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        chapters = Chapter.objects.all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)

    def retrieve(self, request, chapterId=None):
        try:
            chapter = Chapter.objects.get(pk=chapterId)
            serializer = ChapterSerializer(chapter)
            return Response(serializer.data)
        except Chapter.DoesNotExist:
            return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request, *args, **kwargs):
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonViewSet(APIView):
    permission_classes = [AllowAny]
    def get_queryset(self):
        chapter_id = self.kwargs['chapter_id']
        return Lesson.objects.filter(chapter_id=chapter_id)

    def get(self, request, *args, **kwargs):
        chapter_id = request.query_params.get('chapter_id', None)
        if chapter_id is not None:
            lessons = Lesson.objects.filter(chapter_id=chapter_id)
        else:
            lessons = Lesson.objects.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopicViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        print(f'Request: {request}')  # Log entire request object
        sublesson_id = request.query_params.get('sublesson', None)
        print(f'Received sublesson_id: {sublesson_id}')  # Debug statement

        if sublesson_id is not None:
            topics = Topic.objects.filter(sublesson_id=sublesson_id)
            print(f'Filtered topics: {topics}')  # Debug statement
        else:
            topics = Topic.objects.all()
            print(f'All topics: {topics}')  # Debug statement

        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExampleViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        examples = Example.objects.all()
        serializer = ExampleSerializer(examples, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ExampleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def execute_code(request, test_type, test_id):
    try:
        # Determine the type of test and fetch the appropriate model instance
        if test_type == 'exercise':
            test_instance = Exercise.objects.get(pk=test_id)
        elif test_type == 'challenge':
            test_instance = Challenge.objects.get(pk=test_id)
        else:
            return JsonResponse({'error': 'Invalid test type'}, status=400)

        folder_name = test_instance.test_script  # Use the folder name from the database
        data = json.loads(request.body)
        code = data.get('code')

        if code is None:
            return JsonResponse({'error': 'No code provided'}, status=400)

        exercise_file_path = f'test/{folder_name}/{folder_name}.py'
        
        # Write user code to file
        with open(exercise_file_path, 'w') as file:
            file.write(code)

        # Execute the test script using unittest
        original_dir = os.getcwd()
        os.chdir(f'test/{folder_name}')
        cmd = ['python', '-m', 'unittest', f'{folder_name}_test.py']
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        os.chdir(original_dir)
        return JsonResponse({'output': result.stdout, 'error': result.stderr, 'success': result.returncode == 0})
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exercise.DoesNotExist:
        return JsonResponse({'error': 'Exercise not found'}, status=404)
    except subprocess.TimeoutExpired:
        return JsonResponse({'error': 'Execution timed out', 'success': False})


