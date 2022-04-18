import { FORM_ACTIONS } from './../Actions'

function isNullValueInObjectOfObjects(object, keysToIgnore) {
    for (const currentKey in object) {
        if (keysToIgnore.has(currentKey)) {
            continue
        }
        const currentValue = object[currentKey]
        if (currentValue === null) {
            return true
        } 
        if (typeof currentValue === 'object') {
            return isNullValueInObjectOfObjects(currentValue, keysToIgnore)
        }
    }
    return false
}

function isFormDataEmpty(formState, formDispatch, isRoundFlight) {
    let keysToIgnore = isRoundFlight ? new Set([]) : new Set(["round_flight"])
    if (isNullValueInObjectOfObjects(formState, keysToIgnore)) {
        formDispatch({
            type: FORM_ACTIONS.ALERTBOX_DISPLAY, 
            payload:{display:true, text: "error: Empty fields"}
        })
        return true
    }
    return false
}

function isRoundFlightDepartureDateCorrect(formState) {
    return formState.go_flight.arriving_datetime.getTime() <  formState.round_flight.departure_datetime.getTime()
}

export default function isFormDataCorrect(formState, formDispatch) {
    let isFormDataCorrect = false
    if (formState.isRoundFlight) {
        if(!(isFormDataEmpty(formState, formDispatch, true))) {
            if (formState.departure_city === formState.arriving_city) {
                formDispatch({
                    type: FORM_ACTIONS.ALERTBOX_DISPLAY, 
                    payload:{
                        display:true, 
                        text: "error: departure_city === arriving_city"
                    }
                })
            } else if (!(isRoundFlightDepartureDateCorrect(formState))) {
                formDispatch({
                    type: FORM_ACTIONS.ALERTBOX_DISPLAY, 
                    payload:{
                        display:true, 
                        text: "error: go_flight_arriving_datetime >= round_flight_departure_datetime"
                    }
                })
            } else {
                isFormDataCorrect = true
            }
        }
    } else {
        isFormDataCorrect = !(isFormDataEmpty(formState, formDispatch, false))
    }
    return isFormDataCorrect
}