import { useState, useEffect, useContext, useReducer } from 'react'
import Select from 'react-select';
import AuthContext from "./Authentication/AuthContext"
import * as utilities from './utilities'
import backend_api_url from './backend_api_url'
import { matchSorter } from 'match-sorter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInputRadio from './CustomInputRadio'
import { useNavigate } from 'react-router-dom'

const FORM_ACTIONS = {
    ROUND_TRIP: 'isRoundTrip',
    DEPARTURE_CITY_ID: 'departureCityId',
    ARRIVING_CITY_ID: 'arrivingCityId',
    DEPARTURE_DATE: 'departure_date',
    ARRIVING_DATE: 'arriving_date',
    FIRST_CLASS: 'isFirstClass',
    CITIES_DATA: 'citiesData',
    CITIES_OPTIONS: 'citiesOptions',
    USER: 'user',
}

function formReducer(state, action) {
    switch (action.type) {
        case FORM_ACTIONS.CITIES_DATA:
            return {
                ...state, 
                citiesData: action.payload,
                citiesOptions: action.payload
            }
        case FORM_ACTIONS.CITIES_OPTIONS:
            return {
                ...state, 
                citiesOptions: matchSorter(
                    state.citiesData, 
                    action.payload, 
                    {keys: ['label']}
                )
            }
        default:
            return {...state, [action.type]: action.payload};
    }
}

const formInitState = {
    isRoundTrip: false,
    citiesData: null,
    citiesOptions: null,
    departureCityId: null,
    arrivingCityId: null,
    departure_date: new Date(),
    arriving_date: new Date(),
    isFirstClass: false,
    user: null,
}

function areEmptyFields(formState, isArrivingData) {
    const arrivingDataKeys = new Set(["arrivingCityId", "arriving_date"])
    for (const currentKey in formState) {
        if (formState[currentKey] === null) {
            if (!(isArrivingData) && arrivingDataKeys.has(currentKey)) {
                continue
            }
            alert("error: Empty fields")
            return true
        }
    }
    return false
}

function isFormDataCorrect(formState) {
    let isFormDataCorrect = false
    if (formState.isRoundTrip) {
        if(!(areEmptyFields(formState, true))) {
            if (formState.departureCityId === formState.arrivingCityId) {
                alert("error: departureCityId === arrivingCityId")
            } else if (formState.departure_date.getTime() === formState.arriving_date.getTime()) {
                alert("error: departure_date === arriving_date")
            } else {
                isFormDataCorrect = true
            }
        }
    } else {
        isFormDataCorrect = !(areEmptyFields(formState, false))
    }
    return isFormDataCorrect
}

const BookingForm = () => {
    const navigateTo = useNavigate()
    const { authTokens, user } = useContext(AuthContext)
    const [formState, formDispatch] = useReducer(formReducer, formInitState)

    useEffect(() => {
        utilities.fetch_and_set_cities_data(
            backend_api_url + 'city/', 
            authTokens, 
            (citiesDataOptions) => formDispatch({ 
                type: FORM_ACTIONS.CITIES_DATA, payload:citiesDataOptions
            })
        )
        formDispatch({ type:FORM_ACTIONS.USER, payload:user.user_id })
    }, [])
    useEffect(() => {
        console.log([formState.departureCityId, formState.arrivingCityId])
    }, [formState])
    if (!(Array.isArray(formState.citiesOptions))) {return <p>Loading...</p>}
    return (
        <form 
            id="booking_form" 
            onSubmit={(event) => {
                event.preventDefault()
                if (isFormDataCorrect()) {
                    navigateTo('/')
                }
            }}>
            <div id="flight_type_input_container">
                <CustomInputRadio 
                    selected={!formState.isRoundTrip}
                    name="flight_type" 
                    id="one_way"
                    setStateFunction={() => formDispatch({
                        type: FORM_ACTIONS.ROUND_TRIP,
                        payload: false
                    })} 
                />
                <CustomInputRadio 
                    selected={formState.isRoundTrip}
                    name="flight_type" 
                    id="round_trip"
                    setStateFunction={() => formDispatch({
                        type: FORM_ACTIONS.ROUND_TRIP,
                        payload: true
                    })} 
                />
            </div>
            <div id="cities_select_container">
                <label>Departure city</label>
                <Select
                    noOptionsMessage={() => "No more options"}
                    options={formState.citiesOptions.slice(0,5)}
                    onInputChange={inputValue => {
                        formDispatch({ 
                            type:FORM_ACTIONS.CITIES_OPTIONS, payload:inputValue
                        })
                    }}
                    onChange={(option) => formDispatch({
                        type: FORM_ACTIONS.DEPARTURE_CITY_ID,
                        payload: parseInt(option.value)
                    })} 
                />
                <label>Arriving city</label>
                <Select
                    noOptionsMessage={() => "No more options"}
                    options={formState.citiesOptions.slice(0,5)}
                    onInputChange={inputValue => {
                        formDispatch({ 
                            type:FORM_ACTIONS.CITIES_OPTIONS, payload:inputValue
                        })
                    }}
                    onChange={(option) => formDispatch({
                        type: FORM_ACTIONS.ARRIVING_CITY_ID,
                        payload: parseInt(option.value)
                    })} 
                />
            </div>
            <div id="dates-container">
                <DatePicker 
                    selected={formState.departure_date} 
                    minDate={new Date()}
                    onChange={(date=Date) => formDispatch({ 
                        type: FORM_ACTIONS.DEPARTURE_DATE,
                        payload: date
                    })} 
                />
                <DatePicker 
                    selected={formState.arriving_date} 
                    minDate={
                        formState.departure_date ? formState.departure_date : new Date()
                    }
                    onChange={(date=Date) => formDispatch({ 
                        type: FORM_ACTIONS.ARRIVING_DATE,
                        payload: date
                    })} 
                />
            </div>
            <div id="flight-class-container">
                <CustomInputRadio 
                    selected={!formState.isFirstClass}
                    name="is_first_class" 
                    id="tourist_class"
                    setStateFunction={() => formDispatch({
                        type: FORM_ACTIONS.FIRST_CLASS,
                        payload: false
                    })} 
                />
                <CustomInputRadio 
                    selected={formState.isFirstClass}
                    name="is_first_class" 
                    id="first_class"
                    setStateFunction={() => formDispatch({
                        type: FORM_ACTIONS.FIRST_CLASS,
                        payload: true
                    })} 
                />
            </div>
            <input type="submit" value="Book Flight" />
        </form>
    )
}

export default BookingForm;