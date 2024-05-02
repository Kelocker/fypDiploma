from django.contrib.auth.models import User
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
    
    

   