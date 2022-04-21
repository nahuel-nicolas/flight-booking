import * as utilities from '../../../Utils/utilities'
import backend_api_url from '../../../Utils/backend_api_url'

async function get_city_id(cityName, authTokens) {
    const current_city_post_response = await utilities.makeRequest(
        backend_api_url + 'city/', authTokens, {name: cityName}
    )
    return current_city_post_response.id
}

async function getFlightData(formData, isGoFlight) {
    let departure_city_id, arriving_city_id, flightType
    if (isGoFlight) {
        flightType = 'go_flight'
        departure_city_id = await get_city_id(
            formData.departure_city, formData.authTokens
        )
        arriving_city_id = await get_city_id(
            formData.arriving_city, formData.authTokens
        )
    } else {
        flightType = 'round_flight'
        departure_city_id = await get_city_id(
            formData.arriving_city, formData.authTokens
        )
        arriving_city_id = await get_city_id(
            formData.departure_city, formData.authTokens
        )
    }
    return {
        ...formData[flightType],
        departure_city: departure_city_id,
        arriving_city: arriving_city_id
    }
}

async function get_flight_id(formData, isGoFlight) {
    const currentFlightData = await getFlightData(formData, isGoFlight)
    const currentFlightPostResponse = await utilities.makeRequest(
        backend_api_url + 'flight/', formData.authTokens, currentFlightData
    )
    return currentFlightPostResponse.id
}

async function getBookingData(formData) {
    const go_flight_id = await get_flight_id(formData, true)
    let round_flight_id = null
    if (formData.isRoundFlight) {
        round_flight_id = await get_flight_id(formData, false)
    }
    return {
        ...formData.passengers_count,
        is_first_class: formData.isFirstClass,
        go_flight: go_flight_id,
        round_flight: round_flight_id,
        passengers: formData.passengers_count,
    }
}

async function get_booking_id(formData) {
    const bookingData = await getBookingData(formData)
    const booking_data_response = await utilities.makeRequest(
        backend_api_url + 'booking/', formData.authTokens, bookingData
    )
    return booking_data_response.id
}

async function get_customer_response(formData) {
    const customer_response = await utilities.makeRequest(
        backend_api_url + 'customer/', formData.authTokens, {user:formData.user}
    )
    return customer_response
}

export default async function getNewBookingReservationResponse(formData) {
    const customer_response = await get_customer_response(formData)
    const new_booking_id = await get_booking_id(formData)
    const customer_bookings = customer_response.bookings
    customer_bookings.push(new_booking_id)
    const newBookingReservationResponse = await utilities.makeRequest(
        `${backend_api_url}customer/${customer_response.id}/`, 
        formData.authTokens, 
        {
            user:formData.user,
            bookings:customer_bookings
        },
        'PUT'
    )
    return newBookingReservationResponse
}