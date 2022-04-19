import { useEffect, useContext, useReducer } from 'react'
import Select from 'react-select';
import { matchSorter } from 'match-sorter'
import CustomInputRadio from './CustomInputRadio/CustomInputRadio'
import DateSection from './DateSection/DateSection'
import Box from './../Box/Box'
import Shadow from './../Shadow/Shadow';
import Checkbox from './Checkbox/Checkbox';
import AuthContext from "../../Authentication/AuthContext"
import * as utilities from '../../Utils/utilities'
import getNewBookingReservationResponse from './Functions/getNewBookingReservationResponse';
import isFormDataCorrect from './Functions/isFormDataCorrect';
import getCitiesDataOptions from './Functions/getCitiesDataOptions';
import { FORM_ACTIONS, CITIES_ACTIONS } from './Actions'

function formReducer(state, action) {
    switch (action.type) {
        case FORM_ACTIONS.AUTHENTICATION:
            return {
                ...state, 
                user: action.payload.user,
                authTokens: action.payload.authTokens
            }
        case FORM_ACTIONS.ALERTBOX_DISPLAY:
            if (action.payload.text === 'Saving data...') {
                return {
                    ...state, 
                    isBoxDisplay: action.payload.display,
                    alertBoxText: action.payload.text,
                    isCheckboxDisplayed: false
                }
            }
            return {
                ...state, 
                isBoxDisplay: action.payload.display,
                alertBoxText: action.payload.text
            }
        case FORM_ACTIONS.DEPARTURE_DATE:
            const currentFlightType = action.payload.flightType
            const currentFlightTypeData = state[currentFlightType]
            currentFlightTypeData.isSelected = true
            currentFlightTypeData[FORM_ACTIONS.DEPARTURE_DATE] = action.payload.datetime
            currentFlightTypeData[
                FORM_ACTIONS.ARRIVING_DATE
            ] = utilities.getNewDateWithAddedHours(action.payload.datetime, 5)
            return {
                ...state, 
                [currentFlightType]: currentFlightTypeData
            }
        default:
            return {...state, [action.type]: action.payload};
    }
}

function citiesReducer(state, action) {
    switch (action.type) {
        case CITIES_ACTIONS.CITIES_DATA:
            return {
                ...state, 
                citiesData: action.payload,
                citiesOptions: action.payload
            }
        case CITIES_ACTIONS.CITIES_OPTIONS:
            return {
                ...state, 
                citiesOptions: matchSorter(
                    state.citiesData, 
                    action.payload, 
                    {keys: ['label']}
                )
            }
        default:
            return state;
    }
}

const formInitState = {
    isRoundFlight: false,
    departure_city: null,
    arriving_city: null,
    go_flight: {
        isSelected: false,
        departure_datetime: utilities.nextMidNightDateTime,
        arriving_datetime: utilities.getNewDateWithAddedHours(
            utilities.nextMidNightDateTime, 5
        ),
    },
    round_flight: {
        isSelected: false,
        departure_datetime: utilities.nextMidNightDateTime,
        arriving_datetime: utilities.nextMidNightDateTime,
    },
    passengers_count: 1,
    isFirstClass: false,
    user: null,
    authTokens: null,
    isBoxDisplay: false,
    alertBoxText: "",
    isCheckboxDisplayed: false,
}

const citiesDataOptions = getCitiesDataOptions()
const citiesInitState = {
    citiesData: citiesDataOptions,
    citiesOptions: citiesDataOptions,
}

async function submitHandler(event, formData, formDispatch, navigateTo) {
    event.preventDefault();
    formDispatch({
        type: FORM_ACTIONS.ALERTBOX_DISPLAY, 
        payload:{text: "Saving data...", display:true}
    })
    await getNewBookingReservationResponse(formData)
    navigateTo('/')
}

function continueHandler(event, formData, formDispatch) {
    event.preventDefault();
    if (isFormDataCorrect(formData, formDispatch)) {
        formDispatch({
            type: FORM_ACTIONS.CHECKBOX_DISPLAY, 
            payload:true
        })
    }
}

const BookingForm = () => {
    const { authTokens, user } = useContext(AuthContext)
    const [formData, formDispatch] = useReducer(formReducer, formInitState)
    const [citiesState, citiesDispatch] = useReducer(citiesReducer, citiesInitState)

    useEffect(() => {
        formDispatch({ 
            type:FORM_ACTIONS.AUTHENTICATION, 
            payload:{user:user.user_id, authTokens:authTokens}
        })
    }, [])

    if (!(Array.isArray(citiesState.citiesOptions))) {
        return <p>Loading...</p>
    }
    return (
        <>
            <Box isBoxDisplayed={formData.isBoxDisplay}>
                {formData.alertBoxText}
            </Box>
            <form 
                id="booking_form" 
            >
                <div id="flight_type_input_container">
                    <CustomInputRadio 
                        selected={!formData.isRoundFlight}
                        name="flight_type" 
                        id="one_way"
                        setStateFunction={() => formDispatch({
                            type: FORM_ACTIONS.ROUND_TRIP,
                            payload: false
                        })} 
                    />
                    <CustomInputRadio 
                        selected={formData.isRoundFlight}
                        name="flight_type" 
                        id="round_trip"
                        setStateFunction={() => formDispatch({
                            type: FORM_ACTIONS.ROUND_TRIP,
                            payload: true
                        })} 
                    />
                </div>
                <div id="dates-container">
                    <DateSection 
                        formData={formData} 
                        formDispatch={formDispatch}
                        flightType="go_flight"
                        actions={FORM_ACTIONS}
                    />
                    {formData.isRoundFlight ? (
                        <DateSection 
                            formData={formData} 
                            formDispatch={formDispatch}
                            flightType="round_flight"
                            actions={FORM_ACTIONS}
                        />
                    ) : null}
                </div>
                <div id="cities_select_container">
                    <label>Departure city</label>
                    <Select
                        noOptionsMessage={() => "No more options"}
                        options={citiesState.citiesOptions.slice(0,5)}
                        onInputChange={inputValue => {
                            citiesDispatch({ 
                                type:CITIES_ACTIONS.CITIES_OPTIONS, payload:inputValue
                            })
                        }}
                        onChange={(option) => {
                            formDispatch({
                            type: FORM_ACTIONS.DEPARTURE_CITY_ID,
                            payload: option.value.toLowerCase()
                        })}} 
                    />
                    <label>Arriving city</label>
                    <Select
                        noOptionsMessage={() => "No more options"}
                        options={citiesState.citiesOptions.slice(0,5)}
                        onInputChange={inputValue => {
                            citiesDispatch({ 
                                type:CITIES_ACTIONS.CITIES_OPTIONS, payload:inputValue
                            })
                        }}
                        onChange={(option) => formDispatch({
                            type: FORM_ACTIONS.ARRIVING_CITY_ID,
                            payload: option.value.toLowerCase()
                        })} 
                    />
                </div>
                <div id="passengers_count">
                    <label htmlFor="passengers_count">Passengers count</label>
                    <input 
                        type="number" 
                        name="passengers_count" 
                        id="passengers_count"
                        min="1"
                        max="21" 
                        value={formData.passengers_count.toString()}
                        onChange={(event) => formDispatch({ 
                            type:FORM_ACTIONS.PASSENGERs_COUNT, 
                            payload:parseInt(event.target.value)
                        })}
                    />
                </div>
                <div id="flight-class-container">
                    <CustomInputRadio 
                        selected={!formData.isFirstClass}
                        name="is_first_class" 
                        id="tourist_class"
                        setStateFunction={() => formDispatch({
                            type: FORM_ACTIONS.FIRST_CLASS,
                            payload: false
                        })} 
                    />
                    <CustomInputRadio 
                        selected={formData.isFirstClass}
                        name="is_first_class" 
                        id="first_class"
                        setStateFunction={() => formDispatch({
                            type: FORM_ACTIONS.FIRST_CLASS,
                            payload: true
                        })} 
                    />
                </div>
                <Shadow isDisplay={formData.isCheckboxDisplayed}>
                    <Checkbox 
                        formData={formData}
                        formDispatch={formDispatch}
                        submitHandler={submitHandler}
                    />
                </Shadow>
                <button 
                    id="submit_button" 
                    onClick={(event) => continueHandler(
                        event, formData, formDispatch
                    )}
                >Continue</button>
            </form>
        </>
    )
}

export default BookingForm;