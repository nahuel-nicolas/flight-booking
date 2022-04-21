import cities from "./cities"

export default function getCitiesDataOptions() {
    return cities.map((cityName) => ({
        value: cityName, label: cityName
    }))
}