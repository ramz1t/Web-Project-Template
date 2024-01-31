from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "is_staff",
        "email",
        "first_name",
        "last_name",
    )
    list_filter = ("is_staff",)
    search_fields = (
        "email",
        "first_name",
        "last_name",
    )
    empty_value_display = "-empty-"
