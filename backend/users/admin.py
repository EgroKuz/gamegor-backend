from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['id', 'username', 'nickname', 'email', 'is_staff', 'registration_date']
    list_filter = ['is_staff', 'is_active', 'registration_date']
    search_fields = ['username', 'nickname', 'email']
    readonly_fields = ['registration_date']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительные поля', {'fields': ('nickname', 'registration_date')}),
    )