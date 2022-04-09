from django.db import models
from django.conf import settings

class City(models.Model):
    name=models.CharField(max_length=100, unique=True)

class FlightBooking(models.Model):
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
    is_first_class = models.BooleanField()
    round_flight = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    passengers = models.ManyToManyField(settings.AUTH_USER_MODEL)

