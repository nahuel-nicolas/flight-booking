import { useState, useEffect, useContext } from 'react'
import Select from 'react-select';
import AuthContext from "./Authentication/AuthContext"
import * as utilities from './utilities'
import backend_api_url from './backend_api_url'
import { matchSorter } from 'match-sorter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInputRadio from './CustomInputRadio'
import { useNavigate } from 'react-router-dom'

function isFormDataCorrect() {
    
}

const BookingForm = () => {
    const navigateTo = useNavigate()
    const { authTokens } = useContext(AuthContext)
    const [isRoundTrip, setIsRoundTrip] = useState(null)
    const [citiesData, setCitiesData] = useState(null)
    const [citiesOptions, setCitiesOptions] = useState(null)
    const [departureCityId, setDepartureCityId] = useState(null)
    const [arrivingCityId, setArrivingCityId] = useState(null)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isFirstClass, setIsFirstClass] = useState(false);

    useEffect(() => {
        utilities.fetch_and_set_cities_data(
            backend_api_url + 'city/', authTokens, setCitiesData, setCitiesOptions
        )
    }, [])
    useEffect(() => {
        console.log([departureCityId, arrivingCityId])
    }, [departureCityId, arrivingCityId])
    if (citiesOptions === null) {return <p>Loading...</p>}
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
                    name="flight_type" 
                    id="one_way"
                    setStateFunction={() => setIsRoundTrip(false)} 
                />
                <CustomInputRadio 
                    name="flight_type" 
                    id="round_trip"
                    setStateFunction={(target) => setIsRoundTrip(target.selected)} 
                />
            </div>
            <div id="cities_select_container">
                <label>Departure city</label>
                <Select
                    noOptionsMessage={() => "No more options"}
                    options={citiesOptions.slice(0,5)}
                    onInputChange={inputValue => {
                        setCitiesOptions(
                            matchSorter(citiesOptions, inputValue, {keys: ['label']})
                        )
                    }}
                    onChange={(option) => setDepartureCityId(parseInt(option.value))}
                />
                <label>Arriving city</label>
                <Select
                    noOptionsMessage={() => "No more options"}
                    options={citiesOptions.slice(0,5)}
                    onInputChange={inputValue => {
                        setCitiesOptions(
                            matchSorter(citiesData, inputValue, {keys: ['label']})
                        )
                    }}
                    onChange={(option) => setArrivingCityId(parseInt(option.value))}
                />
            </div>
            <div id="dates-container">
                <DatePicker 
                    selected={startDate} 
                    minDate={new Date()}
                    onChange={(date=Date) => setStartDate(date)} 
                />
                <DatePicker 
                    selected={endDate} 
                    minDate={startDate ? startDate : new Date()}
                    onChange={(date=Date) => setEndDate(date)} 
                />
            </div>
            <div id="flight-class-container">
                <CustomInputRadio 
                    name="is_first_class" 
                    id="tourist_class"
                    setStateFunction={(target) => setIsFirstClass(target.selected)} 
                />
                <CustomInputRadio 
                    name="is_first_class" 
                    id="first_class"
                    setStateFunction={(target) => setIsFirstClass(target.selected)} 
                />
            </div>
            <input type="submit" value="Book Flight" />
        </form>
    )
}

export default BookingForm;