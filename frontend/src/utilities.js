export async function getCitiesDataOptions(url, authTokens) {
    const citiesData = await customFetch(url, 'GET', authTokens)
    const citiesDataOptions = getOptionsFromObjectsList(citiesData, 'id', 'name')
    return citiesDataOptions
}

export async function fetch_and_set_cities_data(url, authTokens, ...setFunctionList) {
    const citiesData = await customFetch(url, 'GET', authTokens)
    const citiesDataOptions = getOptionsFromObjectsList(citiesData, 'id', 'name')
    for (const setFunction of setFunctionList) {
        setFunction(citiesDataOptions)
    }
}

export function getOptionsFromObjectsList(list, valueParameter, labelParameter) {
    return list.map((object) => (
        {value: object[valueParameter], label: object[labelParameter]}
    ))
}

export async function customFetch(url, methodType, authTokens) {
    const response = await fetch(url, {
        method:methodType,
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    const responseData = await response.json()
    return responseData
}

export async function fetch_and_set(url, authTokens, ...setFunctionList) {
    const responseData = customFetch(url, 'GET', authTokens);
    for (const setFunction of setFunctionList) {
        setFunction(responseData);
    }
}

export async function makePostRequest(url, authTokens, data) {
  const response = await fetch(
    url, 
    {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify(data)
    }
  )
  const responseData = await response.json();
  return responseData
}