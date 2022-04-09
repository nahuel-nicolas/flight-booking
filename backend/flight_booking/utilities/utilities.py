from ..models import City
from .cities import cities

def build_cities_table():
    """
    # Run in shell:
    from flight_booking.utilities import utilities
    utilities.build_cities_table()
    """
    for currentCityName in cities:
        City.objects.get_or_create(name=currentCityName)

