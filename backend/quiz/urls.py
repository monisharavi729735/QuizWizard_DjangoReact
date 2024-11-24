from django.urls import path
from . import views

urlpatterns = [
    path("generate-quiz/", views.create_quiz, name="generate_quiz"),
    path('quiz-list/', views.quiz_list_view, name='quiz-list'),
]