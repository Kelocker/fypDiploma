# exercises/views.py
from rest_framework import viewsets
from .models import ExerciseFiles
from .serializers import ExerciseFilesSerializer

class ExerciseFilesViewSet(viewsets.ModelViewSet):
    queryset = ExerciseFiles.objects.all()
    serializer_class = ExerciseFilesSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

# exercises/views.py
from django.http import JsonResponse
from .models import ExerciseFiles

def run_tests(request, exercise_id):
    # Fetch the exercise by ID
    try:
        exercise = ExerciseFiles.objects.get(id=exercise_id)
    except ExerciseFiles.DoesNotExist:
        return JsonResponse({"error": "Exercise not found"}, status=404)

    # Implement the logic to run tests on the specified exercise.
    # For example, invoking an external script or function directly.

    # For now, returning a success message as a placeholder
    return JsonResponse({"status": "success"})
