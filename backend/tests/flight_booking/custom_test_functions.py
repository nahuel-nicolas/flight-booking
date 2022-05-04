acceptable_response_status = set([200, 201])

def getResponseID(response):
    assert response.status_code in acceptable_response_status
    return response.data["id"]

def getCityID(client, cityName):
    response = client.post('/city/', dict(name=cityName))
    return getResponseID(response)

def getFlightID(client, flightData):
    response = client.post('/flight/', flightData)
    return getResponseID(response)

def getBookingID(client, booking_data):
    response = client.post("/booking/", booking_data)
    return getResponseID(response) 

def getCustomerResponse(client, userData):
    response = client.post("/customer/", dict(user=userData["id"]))
    assert response.status_code in acceptable_response_status
    return response.data