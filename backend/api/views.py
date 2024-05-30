from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise
from django.db.models import Case, When, Value, IntegerField
from rest_framework.views import APIView
from .models import Chapter, Lesson, Topic, Example
from .serializers import ChapterSerializer, LessonSerializer, TopicSerializer, ExampleSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

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