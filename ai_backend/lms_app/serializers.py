from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Course, Quiz, Book
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'background_level', 'learning_goals', 
                  'available_time_per_week', 'specific_interests', 'previous_experience', 
                  'preferred_pace', 'language_preference', 'wallet_address']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            background_level=validated_data['background_level'],
            learning_goals=validated_data['learning_goals'],
            available_time_per_week=validated_data['available_time_per_week'],
            specific_interests=validated_data['specific_interests'],
            previous_experience=validated_data['previous_experience'],
            preferred_pace=validated_data['preferred_pace'],
            language_preference=validated_data['language_preference'],
            wallet_address=validated_data['wallet_address'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data.update({
            'user_id': self.user.id,
            'email': self.user.email,
            'background_level': self.user.background_level,
            'learning_goals': self.user.learning_goals,
            'available_time_per_week': self.user.available_time_per_week,
            'specific_interests': self.user.specific_interests,
            'previous_experience': self.user.previous_experience,
            'preferred_pace': self.user.preferred_pace,
            'language_preference': self.user.language_preference,
            'wallet_address': self.user.wallet_address,
        })
        return data


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'chapter_number', 'question', 'correct_answer', 'user_answer', 'is_correct']

class CourseSerializer(serializers.ModelSerializer):
    quizzes = QuizSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'user', 'title', 'description', 'chapter_1', 'chapter_2', 'chapter_3', 'created_at', 'quizzes']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'file_name', 'embedding_id']