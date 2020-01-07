from django.urls import path

from . import views

urlpatterns = [
    path('', views.create_dice),
    path('2', views.create_dice2),
    path('new', views.create_dice_new),
]