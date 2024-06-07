from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Exercise, Submission, Chapter, Lesson, Topic, Example
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Serialiser will look for the field in the model
        model = User
        fields = ["id", "username", "email", "password"]
        # to make user it is valid
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate_username(self, value):
        # Check if any existing user with the same username
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value

    def validate_email(self, value):
        # Check if any existing user with the same email
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value
    
    # Serialiser will pass the validated data to the create method
    # To create a new user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    



class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

from rest_framework import serializers

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, min_length=8, required=True)

    def validate_password(self, value):
        # You can add more password validation here if needed
        return value



# serializers.py
from .models import Chapter, Lesson, Topic, Example

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'

class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Example
        fields = '__all__'

