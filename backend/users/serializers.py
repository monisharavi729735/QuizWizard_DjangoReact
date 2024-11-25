from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from quiz.models import Quiz  # Import the Quiz model

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
        }

class CustomLoginSerializer(LoginSerializer):
    username = None  # Remove username field
    email = serializers.EmailField(required=True)


# Serializer for handling quiz creation
class QuizSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Read-only field for the authenticated user

    class Meta:
        model = Quiz
        fields = ['id', 'user', 'title', 'description', 'difficulty', 'quiz_content']

    def create(self, validated_data):
        # Automatically assign the authenticated user when creating a quiz
        request = self.context.get('request')  # Access the request from the context
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)
