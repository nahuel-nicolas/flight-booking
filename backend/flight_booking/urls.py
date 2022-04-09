from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('city', views.CityViewSet)
router.register('flight', views.FlightViewSet)

urlpatterns = [
    path('', include(router.urls)),
]