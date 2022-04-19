from django.urls import path, include
from rest_framework import routers
from django.views.generic import TemplateView
from . import views

router = routers.DefaultRouter()
router.register('city', views.CityViewSet)
router.register('flight', views.FlightViewSet)
router.register('booking', views.FlightBookingViewSet)
router.register('customer', views.CustomerViewSet)
router.register('user', views.UserViewSet)

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/', include(router.urls)),
]