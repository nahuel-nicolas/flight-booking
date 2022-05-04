import pytest
from .custom_test_functions import (
    getBookingID, getCityID, getCustomerResponse, getFlightID, 
    acceptable_response_status
)
from flight_booking import models

@pytest.mark.django_db
def test_post_city(authenticated_user_client):
    client = authenticated_user_client["client"]
    cityName = "buenos aires"
    cityID = getCityID(client, cityName)
    cityObjectInDatabase = models.City.objects.get(id=cityID)
    assert cityName == cityObjectInDatabase.name

@pytest.mark.django_db
def test_post_flight(authenticated_user_client):
    client = authenticated_user_client["client"]
    flightID = getFlightID(client, dict(
        departure_datetime="2022-05-05T16:59:00Z", 
        arriving_datetime="2022-05-20T16:59:00Z",
        arriving_city=getCityID(client, "los angeles"),
        departure_city=getCityID(client, "buenos aires"),
    ))
    flightObjectInDatabase = models.Flight.objects.get(id=flightID)
    assert flightID == flightObjectInDatabase.id

@pytest.mark.django_db
def test_post_customer(authenticated_user_client):
    client = authenticated_user_client["client"]
    userData = authenticated_user_client["userData"]
    customerResponse = getCustomerResponse(client, userData)
    customerID = customerResponse["id"]
    customerObjectInDatabase = models.Customer.objects.get(id=customerID)
    assert customerID == customerObjectInDatabase.id

@pytest.mark.django_db
def test_post_go_flight_booking(authenticated_user_client):
    client = authenticated_user_client["client"]
    userData = authenticated_user_client["userData"]
    initial_booking_data = dict(
        departure_city="buenos aires",
        arriving_city="los angeles",
        go_flight=dict(
            departure_datetime="2022-05-05T16:59:00Z",
            arriving_datetime="2022-05-20T16:59:00Z",
        ),
        round_flight="",
        passengers=3,
        is_first_class=False,
    )
    booking_data = dict(**initial_booking_data)
    booking_data["departure_city"] = getCityID(client, booking_data["departure_city"])
    booking_data["arriving_city"] = getCityID(client, booking_data["arriving_city"])
    booking_data["go_flight"] = getFlightID(client, dict(
        arriving_city=booking_data["arriving_city"],
        departure_city=booking_data["departure_city"],
        departure_datetime=booking_data["go_flight"]["departure_datetime"],
        arriving_datetime=booking_data["go_flight"]["arriving_datetime"],
    ))
    bookingID = getBookingID(client, booking_data)
    customerResponse = getCustomerResponse(client, userData)
    customerResponse["bookings"].append(bookingID)
    response = client.put(f"/customer/{customerResponse['id']}/", dict(
        user=userData["id"],
        bookings=customerResponse["bookings"]
    ))
    assert response.status_code in acceptable_response_status
    customerID = response.data["id"]
    customerObjectInDatabase = models.Customer.objects.get(id=customerID)
    bookingObjectInDatabase = customerObjectInDatabase.bookings.get(id=bookingID)
    assert bookingObjectInDatabase.id == bookingID
    
@pytest.mark.django_db
def test_post_round_flight_booking(authenticated_user_client):
    client = authenticated_user_client["client"]
    userData = authenticated_user_client["userData"]
    initial_booking_data = dict(
        departure_city="buenos aires",
        arriving_city="los angeles",
        go_flight=dict(
            departure_datetime="2022-05-05T16:59:00Z",
            arriving_datetime="2022-05-20T16:59:00Z",
        ),
        round_flight=dict(
            departure_datetime="2022-07-05T16:59:00Z",
            arriving_datetime="2022-07-20T16:59:00Z",
        ),
        passengers=3,
        is_first_class=False,
    )
    booking_data = dict(**initial_booking_data)
    booking_data["departure_city"] = getCityID(client, booking_data["departure_city"])
    booking_data["arriving_city"] = getCityID(client, booking_data["arriving_city"])
    booking_data["go_flight"] = getFlightID(client, dict(
        arriving_city=booking_data["arriving_city"],
        departure_city=booking_data["departure_city"],
        departure_datetime=booking_data["go_flight"]["departure_datetime"],
        arriving_datetime=booking_data["go_flight"]["arriving_datetime"],
    ))
    booking_data["round_flight"] = getFlightID(client, dict(
        arriving_city=booking_data["departure_city"],
        departure_city=booking_data["arriving_city"],
        departure_datetime=booking_data["round_flight"]["departure_datetime"],
        arriving_datetime=booking_data["round_flight"]["arriving_datetime"],
    ))
    bookingID = getBookingID(client, booking_data)
    customerResponse = getCustomerResponse(client, userData)
    customerResponse["bookings"].append(bookingID)
    response = client.put(f"/customer/{customerResponse['id']}/", dict(
        user=userData["id"],
        bookings=customerResponse["bookings"]
    ))
    assert response.status_code in acceptable_response_status
    customerID = response.data["id"]
    customerObjectInDatabase = models.Customer.objects.get(id=customerID)
    bookingObjectInDatabase = customerObjectInDatabase.bookings.get(id=bookingID)
    assert bookingObjectInDatabase.id == bookingID