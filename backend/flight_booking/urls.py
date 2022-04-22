from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('city', views.CityViewSet)
router.register('flight', views.FlightViewSet)
router.register('booking', views.FlightBookingViewSet)
router.register('customer', views.CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]