from django.urls import path
from .views import UserRegistrationView, ConversationListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path(
        "conversations/",
        ConversationListCreateView.as_view(),
        name="conversation-list-create",
    ),
]
