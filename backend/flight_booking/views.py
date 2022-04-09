from rest_framework import viewsets
from rest_framework import permissions
from .models import FlightBooking, City
from .serializers import CitySerializer, FlightBookingSerializer

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    # permission_classes = [permissions.IsAuthenticated]

class FlightBookingViewSet(viewsets.ModelViewSet):
    queryset = FlightBooking.objects.all()
    serializer_class = FlightBookingSerializer
    # permission_classes = [permissions.IsAuthenticated]
