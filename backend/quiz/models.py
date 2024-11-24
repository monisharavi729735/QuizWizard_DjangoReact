from django.db import models
from django.conf import settings

class Quiz(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard')
    ]
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="quizzes", null=True
    )
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    difficulty = models.CharField(
        max_length=10, choices=DIFFICULTY_CHOICES, default='easy'
    )
    num_questions = models.PositiveIntegerField(default=1)
    quiz_content = models.JSONField(null=True, blank=True, help_text="Store generated quiz content as JSON")
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date_created']
