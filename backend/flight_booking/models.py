from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class City(models.Model):
    name=models.CharField(max_length=100, unique=True)

class Flight(models.Model):
    departure_city = models.ForeignKey(
        City, 
        on_delete=models.CASCADE, 
        related_name="departure_city"
    )
    arriving_city = models.ForeignKey(
        City, 
        on_delete=models.CASCADE, 
        related_name="arriving_city"
    )
    departure_datetime = models.DateTimeField()
    arriving_datetime = models.DateTimeField()

class FlightBooking(models.Model):
    go_flight = models.ForeignKey(
        Flight, related_name='go_flight', on_delete=models.CASCADE
    )
    round_flight = models.ForeignKey(
        Flight, related_name='round_flight', on_delete=models.CASCADE, null=True
    )
    passengers = models.IntegerField()
    is_first_class = models.BooleanField()

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bookings = models.ManyToManyField(FlightBooking, blank=True)
    