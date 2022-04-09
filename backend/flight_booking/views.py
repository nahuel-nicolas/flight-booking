from rest_framework import viewsets
from rest_framework import permissions
from .models import Flight, City
from .serializers import CitySerializer, FlightSerializer

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    # permission_classes = [permissions.IsAuthenticated]

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    # permission_classes = [permissions.IsAuthenticated]
