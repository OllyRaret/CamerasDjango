from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('create_user/', views.create_user, name='create_user'),
    path('login_user/', views.login_user, name='login_user'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('<int:id>/', views.reg, name='reg'),
]
