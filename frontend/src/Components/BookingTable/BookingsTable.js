import { useEffect, useContext, useReducer, Fragment } from 'react'
import { Link } from 'react-router-dom'
import backend_api_url from '../../Utils/backend_api_url'
import BookingRow from './BookingRow/BookingRow'
import * as utilities from '../../Utils/utilities'
import AuthContext from '../../Authentication/AuthContext'

const init_api_data = {
    city: {},
    flight: {},
    booking: {},
    customer: {},
    currentUserBookings: null,
}

function api_data_reducer(state, action) {
    switch (action.type) {
        case "load":
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        default:
            return state;
    }
}

async function load_api_data(state, stateDispatch, user_id, authTokens) {
    const keysToAvoid = new Set(['authTokens', 'currentUserBookings'])
    for (const currentKey in state) {
        if (keysToAvoid.has(currentKey)) continue
        await utilities.customFetch(backend_api_url + currentKey, 'GET', authTokens)
        .then(response => response.json())
        .then(response => {
            stateDispatch({ type:'load', payload:{key:currentKey, value:response} })
            if (currentKey === 'customer') {
                let currentUserBookings = []
                if (user_id in response) {
                    currentUserBookings = response[user_id].bookings
                }
                stateDispatch({ type:'load', payload:{
                    key:'currentUserBookings', value:currentUserBookings
                }})
            }
        })
    }
}

const BookingsTable = () => {
    const { authTokens, user } = useContext(AuthContext)
    const [api_data, api_data_dispatch] = useReducer(api_data_reducer, init_api_data)
    useEffect(() => {
        load_api_data(api_data, api_data_dispatch, user.user_id, authTokens)
    }, [])
    if (api_data.currentUserBookings === null) return <h2>loading...</h2>
    if (api_data.currentUserBookings.length === 0) {
        return (
            <>
                <p>
                    It seems you have not reserved any bookings yet.    
                </p> 
                <p>
                    Reseserve new ones here: <Link to="form">Booking Form</Link>
                </p>
            </>
        )
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departure City</th>
                        <th>Arriving City</th>
                        {["Go Flight", "Round Flight"].map((flightType, i) => (
                            <Fragment key={i}>
                                <th>{flightType}<br />Departure Date</th>
                                <th>{flightType}<br />Arriving Date</th>
                            </Fragment>
                        ))}
                        <th>Passengers Count</th>
                        <th>Flight Class</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        api_data.currentUserBookings.map((booking_id, index) => (
                                <BookingRow 
                                    api_data={api_data}
                                    key={booking_id}
                                    booking_id={booking_id}
                                    index={index}
                                />
                            )
                        )
                    }
                </tbody>
            </table> 
        </>
    )
}

export default BookingsTable