import pytest
from .custom_test_functions import (
    getBookingID, getCityID, getCustomerResponse, getFlightID,
)

@pytest.mark.django_db
def test_get_or_create_city(authenticated_user_client):
    client = authenticated_user_client["client"]
    cityName = "buenos aires"
    first_post_id = getCityID(client, cityName)
    second_post_id = getCityID(client, cityName)
    assert first_post_id == second_post_id


@pytest.mark.django_db
def test_create_flight(authenticated_user_client):
    client = authenticated_user_client["client"]
    first_post_id = getFlightID(client, dict(
        departure_datetime="2022-05-05T16:59:00Z", 
        arriving_datetime="2022-05-20T16:59:00Z",
        arriving_city=getCityID(client, "los angeles"),
        departure_city=getCityID(client, "buenos aires"),
    ))
    second_post_id = getFlightID(client, dict(
        departure_datetime="2022-05-05T16:59:00Z", 
        arriving_datetime="2022-05-20T16:59:00Z",
        arriving_city=getCityID(client, "los angeles"),
        departure_city=getCityID(client, "buenos aires"),
    ))
    assert first_post_id == second_post_id

@pytest.mark.django_db
def test_create_customer(authenticated_user_client):
    client = authenticated_user_client["client"]
    userData = authenticated_user_client["userData"]
    first_post_id = getCustomerResponse(client, userData)["id"]
    second_post_id = getCustomerResponse(client, userData)["id"]
    assert first_post_id == second_post_id