import './Checkbox.css'
import { useNavigate } from 'react-router-dom'
import { capitalizeString } from '../../../Utils/utilities'

export default function Checkbox({ formData, formDispatch, submitHandler }) {
    const navigateTo = useNavigate()
    return (
        <div className="check_box">
            <div className="columns">
                <div className="key_column">
                    <span>Departure City</span>
                    <span>Arriving City</span>
                    <span>Flight Class</span>
                    <span>Passengers Count</span>
                    <span>Go Flight Departure datetime</span>
                    <span>Go Flight Arriving datetime</span>
                    <span>Round Flight Departure datetime</span>
                    <span>Round Flight Arriving datetime</span>
                </div>
                <div className="value_column">
                    <span>
                        {formData.departure_city 
                        ? capitalizeString(formData.departure_city)
                        : "-"}
                    </span>
                    <span>
                        {formData.arriving_city 
                        ? capitalizeString(formData.arriving_city)
                        : "-"}
                    </span>
                    <span>{formData.is_first_class ? "First class": "Tourist"}</span>
                    <span>{formData.passengers_count}</span>
                    <span>{formData.go_flight.departure_datetime.toLocaleString()}</span>
                    <span>{formData.go_flight.arriving_datetime.toLocaleString()}*</span>
                    <span>
                        {
                            formData.isRoundFlight 
                            ? formData.round_flight.departure_datetime.toLocaleString()
                            : "-"
                        }
                    </span>
                    <span>
                        {
                            formData.isRoundFlight 
                            ? formData.round_flight.arriving_datetime.toLocaleString() + "*"
                            : "-"
                        }
                    </span>
                </div>
            </div>
            <span>*Arriving datetimes are calculated to be 5 hours later than their departure datetimes</span>
            <input 
                id="super_submit"
                type="submit" 
                value="Book Flight"
                onClick={(event) => submitHandler(
                    event, formData, formDispatch, navigateTo
                )} 
            />
        </div>
    )
}