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

    # Serialiser will pass the validated data to the create method
    # To create a new user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user