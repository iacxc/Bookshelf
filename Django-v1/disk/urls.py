
from django.urls import path

from . import views

app_name = 'disk'
urlpatterns = [
    path('', views.register, name='register'),
]