import os
import json
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models

class User(AbstractUser):
    BACKGROUND_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    PACE_CHOICES = [
        ('fast', 'Fast-paced'),
        ('moderate', 'Moderate'),
        ('slow', 'Slow'),
    ]

    background_level = models.CharField(max_length=20, choices=BACKGROUND_LEVELS)
    learning_goals = models.TextField(null=True, blank=True)
    available_time_per_week = models.IntegerField(null=True, blank=True, help_text="Time available for studying in hours per week")
    specific_interests = models.TextField(null=True, blank=True)
    previous_experience = models.TextField(null=True, blank=True)
    preferred_pace = models.CharField(max_length=10, choices=PACE_CHOICES)
    language_preference = models.CharField(max_length=50, null=True, blank=True)
    wallet_address = models.CharField(max_length=255, unique=True, help_text="Blockchain wallet address")

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_name='custom_user_set',
        related_query_name='custom_user',
    )

    # Override the user_permissions field
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='custom_user_set',
        related_query_name='custom_user',
    )

class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    title = models.CharField(max_length=255)
    description = models.TextField()
    chapter_1 = models.TextField()
    chapter_2 = models.TextField()
    chapter_3 = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Quiz(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')
    chapter_number = models.PositiveSmallIntegerField()
    question = models.TextField()
    options = models.TextField() 
    correct_answer = models.TextField()
    user_answer = models.TextField(null=True, blank=True)
    is_correct = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('course', 'chapter_number', 'question')

    def set_options(self, options):
        self.options = json.dumps(options)

    def get_options(self):
        return json.loads(self.options)

    def __str__(self):
        return f"Quiz for {self.course.title} - Chapter {self.chapter_number}"


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255, default="blockchain_book.pdf")
    embedding_id = models.CharField(max_length=255, unique=True)

    @property
    def file_path(self):
        return os.path.join(settings.BASE_DIR, 'lms_app', 'books', self.file_name)

    def __str__(self):
        return self.title
    

class BookChunk(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='chunks')
    chunk_id = models.IntegerField()
    content = models.TextField()

    class Meta:
        unique_together = ('book', 'chunk_id')

    def __str__(self):
        return f"{self.book.title} - Chunk {self.chunk_id}"