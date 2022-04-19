from ..models import City
from .cities import cities

"""
# Run in shell:
from flight_booking.utilities import utilities
utilities.build_cities_table()
"""
def build_cities_table():
    for currentCityName in cities:
        City.objects.get_or_create(name=currentCityName)