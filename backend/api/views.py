from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from .models import Exercise
from django.db.models import Case, When, Value, IntegerField
from rest_framework.views import APIView


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
    } for exercise in exercises]
    return JsonResponse(exercise_list, safe=False)

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
