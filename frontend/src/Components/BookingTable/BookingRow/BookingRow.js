import { useEffect, useState } from "react"
import getBookingData from "./getBookingData"
import getFlightCells from "./getFlightCells"
import * as utils from '../../../Utils/utilities'

function getEmptyRow(columnsNumber) {
    const emptyCells = []
    for (let i=0; i <= columnsNumber; i++) {
        emptyCells.push(<td key={i}>-</td>)
    }
    return <tr>{emptyCells}</tr>
}

const BookingRow = ({ api_data, booking_id, index }) => {
    const [bookingData, setBookingData] = useState(null)
    const rowStyle = {
        background: index % 2 === 0 ? 'rgb(240, 240, 240)' : 'white'
    }
    useEffect(() => {
        setBookingData(getBookingData(api_data, booking_id))
    }, [])
    /*
    Row must follow this structure:
    ID
    Departure City
    Arriving City

    Go Flight:
    Departure Date
    Arriving Date

    Arriving Flight:
    Departure Date
    Arriving Date

    Passengers Count
    Flight Class
    */
   if (bookingData === null) {
       return getEmptyRow(11)
   }
    return (
        <tr id="booking_row" style={rowStyle}>
            <td>{booking_id}</td>
            <td>{utils.capitalizeString(bookingData.go_flight.departure_city)}</td>
            <td>{utils.capitalizeString(bookingData.go_flight.arriving_city)}</td>
            {getFlightCells(bookingData)}
            <td>{bookingData.passengers}</td>
            <td>{bookingData.is_first_class ? "First class" : "Tourist"}</td>
        </tr>
    )
}

export default BookingRow