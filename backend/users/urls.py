from django.urls import path
from .views import CustomRegisterView, CustomLoginView
from dj_rest_auth.views import LogoutView, UserDetailsView

urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="rest_register"),
    path("login/", CustomLoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
]