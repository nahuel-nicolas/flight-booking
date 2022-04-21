import BasicDateTimePicker from './BasicDateTimePicker'
import * as utilities from '../../../Utils/utilities'
import './DateSection.css'

export default function DateSection({ formData, formDispatch, flightType, actions }) {
    let minDatetime = flightType === "go_flight" 
    ? utilities.nextMidNightDateTime : formData.go_flight.arriving_datetime
    return (
        <div className="date_section">
            <BasicDateTimePicker 
                value={formData[flightType].departure_datetime}
                onChangeHandler={(newDatetime) => formDispatch({
                    type:actions.DEPARTURE_DATE, payload:{
                        flightType:flightType, datetime:newDatetime
                    }}
                )}
                minDatetime={minDatetime}
                label={utilities.getVisualString(flightType) + " Departure Datetime"}
            />
        </div>
    )
}