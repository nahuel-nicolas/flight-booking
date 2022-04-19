// General utils
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeString(string) {
  const stringWords = string.split(' ')
  for (let idx=0; idx<stringWords.length; idx++) {
    stringWords[idx] = capitalizeFirstLetter(stringWords[idx])
  }
  return stringWords.join(' ')
}

export function getVisualString(string) {
  return capitalizeString(string.replace('_', ' '))
}

export function customFetch(url, methodType, authTokens) {
    return fetch(url, {
        method:methodType,
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
}

export async function makeRequest(url, authTokens, data, requestType='POST') {
  const response = await fetch(
    url, 
    {
      method: requestType,
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

// BookingForm utils

export const nextMidNightDateTime = new Date(new Date().setHours(24,0,0,0))

export function getNewDateWithAddedHours(baseDate, hours) {
    const newDate = new Date()
    newDate.setTime(baseDate.getTime() + (hours*60*60*1000))
    return newDate
}