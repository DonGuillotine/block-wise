from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserListCreate, CustomTokenObtainPairView, CourseListCreate, CourseGenerate, QuizSubmit, BookListCreate

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('courses/', CourseListCreate.as_view(), name='course-list-create'),
    path('courses/generate/', CourseGenerate.as_view(), name='course-generate'),
    path('quizzes/<int:pk>/submit/', QuizSubmit.as_view(), name='quiz-submit'),
    path('books/', BookListCreate.as_view(), name='book-list-create'),
]