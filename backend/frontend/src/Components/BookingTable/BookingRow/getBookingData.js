function getCityName(city_api_data, city_id) {
    return city_api_data[city_id].name
}

function getFlightData(api_data, flight_id) {
    if (flight_id === null) {
        return {
            departure_city: null,
            arriving_city: null,
            departure_datetime: null,
            arriving_datetime: null
        }
    }
    const flightData = {...api_data.flight[flight_id]}
    flightData.departure_city = getCityName(api_data.city, flightData.departure_city)
    flightData.arriving_city = getCityName(api_data.city, flightData.arriving_city)
    return flightData
}

export default function getBookingData(api_data, booking_id) {
    const bookingData = {...api_data.booking[booking_id]}
    bookingData.go_flight = getFlightData(api_data, bookingData.go_flight)
    bookingData.round_flight = getFlightData(api_data, bookingData.round_flight)
    return bookingData
}