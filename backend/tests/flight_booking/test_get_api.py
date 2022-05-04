import pytest
from flight_booking import models
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_get_city(authenticated_user_client):
    cityName = "buenos aires"
    cityObject = models.City.objects.create(name="buenos aires")
    cityID = cityObject.id
    client = authenticated_user_client["client"]
    response = client.get("/city/")
    assert response.data[cityID]["name"] == cityName

@pytest.mark.django_db
def test_get_flight(authenticated_user_client):
    flightData = dict(
        departure_datetime="2022-05-05T16:59:00Z", 
        arriving_datetime="2022-05-20T16:59:00Z",
        departure_city=models.City.objects.create(name="buenos aires"),
        arriving_city=models.City.objects.create(name="los angeles"),
    )
    flightObject = models.Flight.objects.create(**flightData)
    flightID = flightObject.id
    client = authenticated_user_client["client"]
    response = client.get("/flight/")
    assert response.data[flightID]["id"] == flightID

@pytest.mark.django_db
def test_get_customer(authenticated_user_client):
    userData = authenticated_user_client["userData"]
    userObject = User.objects.get(id=userData["id"])
    customerObject = models.Customer.objects.create(user=userObject)
    customerID = customerObject.id
    client = authenticated_user_client["client"]
    response = client.get("/customer/")
    assert response.data[customerID]["id"] == customerID