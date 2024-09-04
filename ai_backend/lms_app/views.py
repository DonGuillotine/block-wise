# course_generator/views.py

import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import User, Course, Quiz, Book
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, CourseSerializer, QuizSerializer, BookSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils import preprocess_and_embed_book, generate_course_outline, generate_chapter_content, generate_quiz
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth import get_user


class UserListCreate(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CourseListCreate(APIView):
    def get(self, request):
        user = get_user(request)  # This forces the evaluation of SimpleLazyObject
        print(type(user))  # Should now be <class 'django.contrib.auth.models.User'>
        print(user.is_authenticated)
        
        courses = Course.objects.filter(user=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CourseSerializer)
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseGenerate(APIView):
    @swagger_auto_schema(request_body=CourseSerializer)
    def post(self, request):
        book_id = request.data.get('book_id')
        book = get_object_or_404(Book, id=book_id)

        existing_course = Course.objects.filter(user=request.user).first()
        
        if existing_course:
            # If the course exists, return the stored data
            return Response(CourseSerializer(existing_course).data, status=status.HTTP_200_OK)

        # Generate course outline
        user_data = {
            'background_level': request.user.background_level,
            'learning_goals': request.user.learning_goals,
            'available_time_per_week': request.user.available_time_per_week,
            'specific_interests': request.user.specific_interests,
            'previous_experience': request.user.previous_experience,
            'preferred_pace': request.user.preferred_pace,
            'language_preference': request.user.language_preference,
        }
        course_outline = generate_course_outline(user_data)

        # Create course
        try:
            course_info = course_outline.get('course_outline', {})
            course = Course.objects.create(
                user=request.user,
                title=course_info.get('title', 'Untitled Course'),
                description=course_info.get('description', 'No description provided')
            )

            # Generate chapter content
            chapters = course_info.get('chapters', [])
            for i, chapter_data in enumerate(chapters, start=1):
                chapter_title = chapter_data.get('title', '')
                chapter_description = chapter_data.get('description', '')

                # Printing for debugging purposes
                print(f"Here's your stuff {chapter_title}, {chapter_description}, {book.id}")

                # Generate content for the chapter
                chapter_content = generate_chapter_content(chapter_title, chapter_description, book.id)
                setattr(course, f'chapter_{i}', chapter_content)

                # Generate quiz for the chapter
                quiz_data = generate_quiz(chapter_content)
                if isinstance(quiz_data, str):
                    try:
                        quiz_data = json.loads(quiz_data)
                    except json.JSONDecodeError:
                        quiz_data = []

                for question_data in quiz_data:
                    Quiz.objects.create(
                        course=course,
                        chapter_number=i,
                        question=question_data.get('question', ''),
                        correct_answer=question_data.get('correct_answer', '')
                    )

            course.save()
            return self.return_first_chapter_and_quiz(course)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def return_first_chapter_and_quiz(self, course):
        chapter_number = 1
        chapter_content = CourseSerializer().get_chapter(course, chapter_number)

        quizzes = Quiz.objects.filter(course=course, chapter_number=chapter_number)
        quiz_serializer = QuizSerializer(quizzes, many=True)

        return Response({
            "chapter_content": chapter_content,
            "quizzes": quiz_serializer.data
        }, status=status.HTTP_201_CREATED)
        
class RetrieveChapterAndQuiz(APIView):

    def get(self, request, course_id, chapter_number):
        # Get the course for the authenticated user
        course = get_object_or_404(Course, id=course_id, user=request.user)

        # Ensure chapter_number is within valid range
        if chapter_number not in [1, 2, 3]:
            return Response({"error": "Invalid chapter number."}, status=status.HTTP_400_BAD_REQUEST)

        # Get the chapter content
        chapter_content = CourseSerializer().get_chapter(course, chapter_number)
        if not chapter_content:
            return Response({"error": "Chapter content not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get the quiz for the specified chapter
        quizzes = Quiz.objects.filter(course=course, chapter_number=chapter_number)
        quiz_serializer = QuizSerializer(quizzes, many=True)

        # Return the chapter content along with the quiz
        return Response({
            "chapter_content": chapter_content,
            "quizzes": quiz_serializer.data
        }, status=status.HTTP_200_OK)
    
        
class QuizSubmit(APIView):
    @swagger_auto_schema(request_body=QuizSerializer)
    def post(self, request, pk):
        quiz = get_object_or_404(Quiz, pk=pk)
        user_answer = request.data.get('answer')
        
        if not user_answer:
            return Response({"error": "Answer is required"}, status=status.HTTP_400_BAD_REQUEST)

        quiz.user_answer = user_answer
        quiz.is_correct = (user_answer.lower() == quiz.correct_answer.lower())
        quiz.save()

        return Response(QuizSerializer(quiz).data)


class BookListCreate(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=BookSerializer)
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)