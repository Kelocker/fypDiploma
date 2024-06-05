# exercises/serializers.py
from rest_framework import serializers
from .models import ExerciseFiles

class ExerciseFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseFiles
        fields = ['id', 'solution', 'test', 'editor', 'exemplar']
