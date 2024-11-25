from django.urls import path
from . import views

urlpatterns = [
    path("generate-quiz/", views.create_quiz, name="generate_quiz"),
    path('quiz-list/', views.quiz_list_view, name='quiz-list'),
    path('quiz-detail/<int:quiz_id>/', views.quiz_detail_view, name='quiz-detail'),
]