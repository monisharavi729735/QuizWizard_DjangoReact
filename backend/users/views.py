from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.http import JsonResponse

@api_view(['GET'])
def test(request):
    return Response({'message': 'success'})

User = get_user_model()

@api_view(['GET'])
def user_detail_view(request):
    user = request.user
    return JsonResponse({
        "pk": user.pk,
        "email": user.email,
        "name": user.name
    })
