from rest_framework import viewsets
from rest_framework.response import Response
from .models import City, Flight, FlightBooking, Customer
from django.contrib.auth.models import User
from .serializers import CitySerializer, FlightSerializer, FlightBookingSerializer, CustomerSerializer, UserSerializer

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    # permission_classes = [permissions.IsAuthenticated]

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class FlightBookingViewSet(viewsets.ModelViewSet):
    queryset = FlightBooking.objects.all()
    serializer_class = FlightBookingSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

def get_object_of_objects(list_of_objects=[], custom_key=""):
    object_of_objects = {}
    for current_object in list_of_objects:
        object_of_objects[current_object[custom_key]] = current_object
    return object_of_objects

# class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        object_of_objects = get_object_of_objects(
            list_of_objects=serializer.data, custom_key="username"
        )
        return Response(object_of_objects)