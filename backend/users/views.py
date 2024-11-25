from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import QuizSerializer

class CustomRegisterView(RegisterView):
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return response

class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return response
    
class QuizCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = QuizSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

@login_required
def debug_session(request):
    return JsonResponse({
        "user": str(request.user),
        "sessionid": request.COOKIES.get('sessionid'),
        "csrftoken": request.COOKIES.get('csrftoken'),
    })