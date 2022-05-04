import pytest

@pytest.mark.django_db
def test_get_home_page_public_acces(client):
	response = client.get('')
	assert response.status_code == 200

@pytest.mark.django_db
def test_get_public_city_page(client):
	response = client.get('/city/')
	assert response.status_code == 200

@pytest.mark.django_db
def test_get_public_flight_page(client):
	response = client.get('/flight/')
	assert response.status_code == 200

@pytest.mark.django_db
def test_get_public_booking_page(client):
	response = client.get('/booking/')
	assert response.status_code == 200

@pytest.mark.django_db
def test_get_public_customer_page(client):
	response = client.get('/customer/')
	assert response.status_code == 200
