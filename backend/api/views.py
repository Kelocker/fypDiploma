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
from rest_framework.decorators import api_view, permission_classes
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

    def post(self, request, *args, **kwargs):
        serializer = CodeSnippetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                # Log the exception to understand what went wrong
                print(f"Error saving data: {str(e)}")
                return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print(f"Validation Errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    # def save_code(request):
    #     if request.method == 'POST':
    #         code_data = request.POST.get('code', '')
    #         if code_data:
    #             snippet = CodeSnippet(code=code_data)
    #             snippet.save()
    #             return HttpResponse("Code saved successfully!")
    #         else:
    #             return HttpResponse("No code provided!", status=400)
    #     return HttpResponse("Invalid request", status=400)


def code_snippets(request):
    if request.method == 'GET':
        snippets = CodeSnippet.objects.all().values()
        return JsonResponse(list(snippets), safe=False)
    elif request.method == 'POST':
        # For simplicity, assuming you're sending data as application/json
        data = request.JSON
        snippet = CodeSnippet(code=data['code'])
        snippet.save()
        return JsonResponse({'id': snippet.id, 'code': snippet.code}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def execute_snippet(request, snippet_id):
    try:
        snippet = CodeSnippet.objects.get(id=snippet_id)
        exec_globals = {}
        exec(snippet.code, exec_globals)
        return JsonResponse({'status': 'success', 'results': exec_globals})
    except CodeSnippet.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Snippet not found'}, status=404)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


from django.http import JsonResponse
from runner import run_tests

# Create a view that returns test results as JSON
def test_results_view(request):
    test_results = run_tests()
    return JsonResponse(test_results, safe=False)
    


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


