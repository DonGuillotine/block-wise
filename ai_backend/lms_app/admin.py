from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Course, Quiz, Book, BookChunk
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'background_level', 'preferred_pace', 'wallet_address']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Custom Fields', {'fields': ('background_level', 'learning_goals', 'available_time_per_week', 
                                      'specific_interests', 'previous_experience', 'preferred_pace', 
                                      'language_preference', 'wallet_address')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'background_level', 'available_time_per_week', 'preferred_pace', 'wallet_address'),
        }),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Course)
admin.site.register(Quiz)
admin.site.register(Book)
admin.site.register(BookChunk)