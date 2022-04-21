from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from .models import City, Flight, FlightBooking, Customer
from .serializers import CitySerializer, FlightSerializer, FlightBookingSerializer, CustomerSerializer

class FastSearchModelViewSet(viewsets.ModelViewSet):
    custom_search_key = "id"

    def list(self, request):
        queryset = self.model.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        list_of_objects = serializer.data
        object_of_objects = {}
        custom_search_key = self.custom_search_key
        for current_object in list_of_objects:
            object_of_objects[current_object[custom_search_key]] = current_object
        return Response(object_of_objects)

    class Meta:
        abstract = True

class CityViewSet(FastSearchModelViewSet):
    model = City
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.IsAuthenticated]

class FlightViewSet(FastSearchModelViewSet):
    model = Flight
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [permissions.IsAuthenticated]

class FlightBookingViewSet(FastSearchModelViewSet):
    model = FlightBooking
    queryset = FlightBooking.objects.all()
    serializer_class = FlightBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

class CustomerViewSet(FastSearchModelViewSet):
    model = Customer
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    custom_search_key = "user"