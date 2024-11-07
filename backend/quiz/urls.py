from django.urls import path
from . import views

urlpatterns = [
    path("generate-quiz/", views.create_quiz, name="generate_quiz"),
    path('answer-quiz/<int:pk>/', views.quiz_detail, name='quiz_detail'),
]