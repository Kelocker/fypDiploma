from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise
from django.db.models import Case, When, Value, IntegerField
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

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
        'title': exercise.title,
        'difficulty_level': exercise.get_difficulty_level_display(),  
        'description': exercise.description,
        'question': exercise.question,
        'answer': exercise.answer
    } for exercise in exercises]
    return JsonResponse(exercise_list, safe=False)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import CodeSnippetSerializer   # Adjust this import according to your project structure

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CodeSnippetSerializer
from .models import CodeSnippet
from .models import CodeSnippet

class CompilerView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        snippets = CodeSnippet.objects.all()
        serializer = CodeSnippetSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
            serializer = CodeSnippetSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics
from .models import Chapter
from .serializers import ChapterSerializer

class ChapterListView(generics.ListAPIView):
    permission_classes = [AllowAny]

    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
from rest_framework import generics
from .models import Chapter
from .serializers import ChapterSerializer
from .models import Lesson
from .serializers import LessonSerializer

from .serializers import QuizSerializer
from .models import Quiz

# kiv this part
class ChapterDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

from rest_framework.generics import RetrieveAPIView, ListAPIView
from .models import Lesson
from .serializers import LessonSerializer

class LessonDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]

    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class LessonListView(ListAPIView):
    permission_classes = [AllowAny]

    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class QuizDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

from .models import Ans
from .serializers import AnsSerializer
class AnsDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]

    queryset = Ans.objects.all()
    serializer_class = AnsSerializer



from django.shortcuts import get_list_or_404

class SubLessonListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        chapter_id = request.query_params.get('chapter_id')
        if chapter_id is not None:
            sublessons = get_list_or_404(Lesson, chapter_id=chapter_id)
        else:
            sublessons = Lesson.objects.all()
        serializer = LessonSerializer(sublessons, many=True)
        return Response(serializer.data)


from django.http import JsonResponse
from .models import Quiz

from django.http import JsonResponse
from .models import Quiz
import subprocess
from django.core.exceptions import ObjectDoesNotExist
from subprocess import TimeoutExpired, CalledProcessError

import subprocess
from subprocess import TimeoutExpired, CalledProcessError
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import CodeSnippet, Quiz
from django.core.exceptions import ObjectDoesNotExist
import logging
import unittest
import io





# # Create a view that returns test results as JSON
# def test_results_view(request):
#     test_results = run_tests()
#     return JsonResponse(test_results, safe=False)

# from runner import run_all_tests

# from rest_framework.decorators import api_view

# @api_view(['GET'])
# def run_all_tests_view(request):
#     results = run_all_tests()
#     return JsonResponse(results, safe=False)

# def submit_code(request):
#     code_text = request.POST.get('code')
#     quiz_id = request.POST.get('quizId')  # Retrieve quizId from the request
#     test_script_path = get_test_script_path(quiz_id)  # Fetch the path from the database

#     new_snippet = CodeSnippet.objects.create(code=code_text)
#     results = run_code_tests(new_snippet.code, test_script_path)  # Use the fetched script path
#     new_snippet.test_results = results
#     new_snippet.save()
#     return JsonResponse({'status': 'submitted', 'snippet_id': new_snippet.id, 'results': results})
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz, CodeSnippet
from .serializers import CodeSnippetSerializer
from rest_framework.permissions import AllowAny
import os
import subprocess
import logging
import traceback
import io
import importlib.util
from contextlib import redirect_stdout
import sys
logger = logging.getLogger(__name__)
class CodeSnippetView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        snippets = CodeSnippet.objects.all()
        serializer = CodeSnippetSerializer(snippets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        logger.debug(f"Incoming request data: {request.data}")
        serializer = CodeSnippetSerializer(data=request.data)
        if serializer.is_valid():
            quiz_id = serializer.validated_data['quiz']
            answer_path = request.data.get('answerPath')
            if not answer_path:
                logger.error("Answer path not provided")
                return Response({'detail': 'Answer path not provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            if not os.path.exists(answer_path):
                logger.error("Answer file does not exist")
                return Response({'detail': 'Answer file does not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            code = serializer.validated_data['code']
            logger.debug(f"Executing code for quiz {quiz_id} with file {answer_path}")
            result = self.execute_code(code, answer_path)
            logger.debug(f"Execution result: {result}")

            # Save the code snippet using quiz_id directly
            snippet = CodeSnippet.objects.create(code=code, quiz=quiz_id, result=result)
            return Response({
                'id': snippet.id,
                'code': code,
                'quiz': snippet.quiz_id,
                'result': snippet.result
            }, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def execute_code(self, code, file_path):
        try:
            # Prepare the directory and module name
            module_name = os.path.splitext(os.path.basename(file_path))[0]
            directory = os.path.dirname(file_path)
            
            # Write the fetched code to a temporary file
            temp_code_file = os.path.join(directory, "temp_code.py")
            with open(temp_code_file, "w") as f:
                f.write(code)
            
            # Add the directory to sys.path
            sys.path.append(directory)
            
            # Load and execute the dynamically created module to make its functions available
            spec = importlib.util.spec_from_file_location("temp_code", temp_code_file)
            temp_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(temp_module)
            
            # Ensure the dynamically created module is available for import
            sys.modules["temp_code"] = temp_module
            
            # Dynamically add the fetched code functions to the test script's module namespace
            test_module_name = os.path.splitext(os.path.basename(file_path))[0]
            test_case = importlib.import_module(test_module_name)
            
            for name, obj in temp_module.__dict__.items():
                if not name.startswith("__"):
                    setattr(test_case, name, obj)
            
            # Run the test suite
            loader = unittest.TestLoader()
            suite = loader.loadTestsFromModule(test_case)
            stream = io.StringIO()
            runner = unittest.TextTestRunner(stream=stream, verbosity=2)
            result = runner.run(suite)
            
            # Get the result as a string
            result = stream.getvalue()
            
            # Clean up the temporary file
            os.remove(temp_code_file)
            
            return result
            
        except Exception as e:
            logger.error(f"Error executing code: {e}")
            logger.error(traceback.format_exc())
            return str(e)
        

