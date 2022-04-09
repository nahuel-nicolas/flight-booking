import random
from datetime import date, datetime, timezone, timedelta
from django.utils.timezone import make_aware
from ..models import Flight, City
from .cities import cities
# https://stackoverflow.com/questions/5476065/how-to-truncate-the-time-on-a-datetime-object
# today utc datetime.now(timezone.utc) 
# today datetime.now()
# today in 10 days datetime.now() + timedelta(days=10)
# today 0 hs datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

def create_random_flights(iterations):
    for i in range(iterations):
        create_random_flight()

def create_random_flight(past_arriving_data=None):
    if past_arriving_data is None:
        departure_city_data = getRandomCityData()
        departure_datetime = getRandomFutureDatetime(
            startingDatetime=getCurrentDate(), isCloseDatetime=False
        )
    else:
        departure_city_data = past_arriving_data["city"]
        departure_datetime = getRandomFutureDatetime(
            startingDatetime=past_arriving_data["datetime"], isCloseDatetime=True
        )

    arriving_city_data = getRandomCityData(avoidCityIdx=departure_city_data["idx"])
    arriving_datetime = getRandomFutureDatetime(
        startingDatetime=departure_datetime, isCloseDatetime=True
    )

    flight_data = {}
    flight_data["departure_city"] = departure_city_data["object"]
    flight_data["arriving_city"] = arriving_city_data["object"]
    flight_data["departure_datetime"] = make_aware(departure_datetime)
    flight_data["arriving_datetime"] = make_aware(arriving_datetime)
    flight_data["round_flight"] = None
    if random.randint(0, 2) > 0: # Decide whether to create round flight or not
        arrivingData = {
            "city": arriving_city_data,
            "datetime": arriving_datetime
        }
        flight_data["round_flight"] = create_random_flight(arrivingData)
    return Flight.objects.create(**flight_data)
    
def getRangeWithException(exceptionInt, startInt, endInt):
    return range(startInt, exceptionInt) + range(exceptionInt, endInt)

def getRandomCityData(avoidCityIdx=None):
    currentCityIdx = None
    while currentCityIdx == avoidCityIdx or currentCityIdx is None:
        currentCityIdx = random.randint(0, len(cities) - 1)
    currentCityName = cities[currentCityIdx]
    currentCityObject = City.objects.get_or_create(name=currentCityName)[0]
    return {
        "object": currentCityObject, 
        "idx": currentCityIdx
    }

def getCurrentDate():
    return datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

def getRandomFutureDatetime(startingDatetime, isCloseDatetime=False):
    if isCloseDatetime:
        return startingDatetime + timedelta(
            minutes=15*random.randint(1, 5), hours=random.randint(1, 12)
        )
    return startingDatetime + timedelta(days=random.randint(5, 70))

