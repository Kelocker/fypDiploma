
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
from django.utils.http import urlsafe_base64_decode
import logging
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Exercise, Challenge, ChallengeSubmission
from django.db.models import Case, When, Value, IntegerField
from rest_framework import generics
from django.contrib.auth.decorators import login_required
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny



class CreatreUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

   
    
class UpdateUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


    def put(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # def put(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     serializer = self.get_serializer(user, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         print("Validation Errors:", serializer.errors)  # Add this line for debugging
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def exercise_list(request):
    difficulty = request.GET.get('difficulty')
    difficulty_sort_order = Case(
        When(difficulty_level='B', then=Value(1)),
        When(difficulty_level='I', then=Value(2)),
        When(difficulty_level='A', then=Value(3)),
        output_field=IntegerField(),
    )

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



def challenge_list(request):
    try:
        challenges = Challenge.objects.all()
        challenge_list = [{
            'id': challenge.id,
            'title': challenge.title,
            'description': challenge.description,
            'question': challenge.question,
            'start_time': challenge.start_time.isoformat(),
            'end_time': challenge.end_time.isoformat(),
        } for challenge in challenges]
        return JsonResponse(challenge_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def challenge_results(request):
    try:
        submissions = ChallengeSubmission.objects.all()
        results_list = [{
            'id': submission.id,
            'challenge_id': submission.challenge.id,
            'user': submission.user.username,
            'rank': submission.rank,
        } for submission in submissions]
        return JsonResponse(results_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import ChallengeSubmission, User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    return JsonResponse({
        'username': user.username,
        'email': user.email,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_challenge_attempt_checker(request, username, challenge_id):
    try:
        user = User.objects.get(username=username)
        submission_exists = ChallengeSubmission.objects.filter(
            challenge_id=challenge_id,
            user=user
        ).exists()

        return JsonResponse({
            'username': username,
            'challenge_id': challenge_id,
            'has_attempted': submission_exists
        })

    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except ChallengeSubmission.DoesNotExist:
        return JsonResponse({'error': 'Challenge not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import Challenge

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_challenge(request, id):
    try:
        challenge = Challenge.objects.get(id=id)
        return JsonResponse({
            'id': challenge.id,
            'title': challenge.title,
            'description': challenge.description,
            'question': challenge.question,
            'start_time': challenge.start_time.isoformat(),
            'end_time': challenge.end_time.isoformat(),
        })
    except Challenge.DoesNotExist:
        return JsonResponse({'error': 'Challenge not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

