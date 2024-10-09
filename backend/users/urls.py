from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView #, UserDetailsView
from django.urls import path
from .views import user_detail_view


urlpatterns = [
    path("register/", RegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path('user/', user_detail_view, name='user-detail'),
]