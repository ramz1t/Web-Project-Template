from django.contrib import admin
from django.urls import path

admin.site.site_header = "<Project> administration"

urlpatterns = [
    path("admin/", admin.site.urls),
]

handler500 = "rest_framework.exceptions.server_error"
handler400 = "rest_framework.exceptions.bad_request"
