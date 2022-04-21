function getCellValue(value) {
    return value === null ? "-" : new Date(value).toLocaleString()
}

function get_td(index, value) {
    return <td key={index}>{value}</td>
}

function getFlightCell(bookingData, flightType, parameterType, counter) {
    return get_td(
        counter++, 
        getCellValue(bookingData[flightType][parameterType])
    )
}

export default function getFlightCells(bookingData) {
    const flightCells = []
    let counter = 0
    for (const currentFlight of ["go_flight", "round_flight"]) {
        for (const currentDateType of ["departure_datetime", "arriving_datetime"]) {
            flightCells.push(getFlightCell(
                bookingData, currentFlight, currentDateType, counter
            )) 
            counter++
        }
    }
    return flightCells
}