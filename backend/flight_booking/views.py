from rest_framework import viewsets, permissions, mixins
from rest_framework.response import Response
from .models import City, Flight, FlightBooking, Customer
from django.contrib.auth.models import User
from .serializers import CitySerializer, FlightSerializer, FlightBookingSerializer, CustomerSerializer, UserSerializer

def get_object_of_objects(list_of_objects=[], custom_key=""):
    object_of_objects = {}
    for current_object in list_of_objects:
        object_of_objects[current_object[custom_key]] = current_object
    return object_of_objects

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = City.objects.all()
        serializer = CitySerializer(queryset, many=True)
        object_of_objects = get_object_of_objects(
            list_of_objects=serializer.data, custom_key="name"
        )
        return Response(object_of_objects)

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        """
        This logic modify the view of flight list with the porpuse
        of optimizing the search algorithm speed.
        Instead of returning the clasic djangorestframework list of
        obkects it returns an object like this:
        {
            f{departure_city}{arriving_city}: {
                f{departure_date}{arriving_date}: flightObject
            }
        }
        This way you can quicly look for an specific flight if you've
        already got the flight data.
        """
        queryset = Flight.objects.all()
        serializer = FlightSerializer(queryset, many=True)
        list_of_objects=serializer.data
        object_of_objects = {}
        for current_object in list_of_objects:
            departure_city_id = current_object["departure_city"]
            arriving_city_id = current_object["arriving_city"]
            departure_city_name = City.objects.get(pk=departure_city_id).name
            arriving_city_name = City.objects.get(pk=arriving_city_id).name
            custom_key = departure_city_name + arriving_city_name
            departure_datetime = current_object["departure_datetime"]
            arriving_datetime = current_object["departure_datetime"]
            secondary_custom_key = departure_datetime + arriving_datetime
            if custom_key in object_of_objects:
                if secondary_custom_key in object_of_objects[custom_key]:
                    object_of_objects[custom_key][secondary_custom_key] = current_object
                else:
                    object_of_objects[custom_key] = {secondary_custom_key: current_object}
            else:
                object_of_objects = {custom_key: {secondary_custom_key: current_object}}
        return Response(object_of_objects)

class FlightBookingViewSet(viewsets.ModelViewSet):
    queryset = FlightBooking.objects.all()
    serializer_class = FlightBookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = FlightBooking.objects.all()
        serializer = FlightBookingSerializer(queryset, many=True)
        object_of_objects = get_object_of_objects(
            list_of_objects=serializer.data, custom_key="id"
        )
        return Response(object_of_objects)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Customer.objects.all()
        serializer = CustomerSerializer(queryset, many=True)
        object_of_objects = get_object_of_objects(
            list_of_objects=serializer.data, custom_key="user_id"
        )
        return Response(object_of_objects)

class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer