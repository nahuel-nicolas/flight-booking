from rest_framework import serializers
from django.contrib.auth.models import User
from .models import City, Flight, FlightBooking, Customer
from django.contrib.auth.hashers import make_password

class GetOrCreateModelSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance, _ = self.Meta.model.objects.get_or_create(**validated_data)
        return instance

    class Meta:
        abstract = True

class CitySerializer(GetOrCreateModelSerializer):
    class Meta:
        model = City
        fields = '__all__'
        extra_kwargs = {
            'name': {'validators': []},
        }

class FlightSerializer(GetOrCreateModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

class FlightBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightBooking
        fields = '__all__'

class CustomerSerializer(GetOrCreateModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        extra_kwargs = {
            'user': {'validators': []},
        }

class UserSerializer(serializers.ModelSerializer):
    def validate_password(self, value: str) -> str:
        return make_password(value)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']