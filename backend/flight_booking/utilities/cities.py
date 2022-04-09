# go to https://en.wikipedia.org/wiki/List_of_cities_by_international_visitors
# then paste this in console:
# const rows = document.querySelector("table").querySelector("tbody").querySelectorAll("tr")
# const cities = []
# for (const currentRow of rows) {
# 	const cells = currentRow.querySelectorAll("td")
# 	cityCell = cells[2]
# 	cities.push(cityCell.querySelector("a").text)
# }
# console.log(cities)

cities = ['Hong Kong', 'Bangkok', 'London', 'Macao', 'Singapore', 'Paris', 'Dubai', 'New York City', 'Kuala Lumpur', 'Istanbul', 'Delhi', 'Antalya', 'Shenzhen', 'Mumbai', 'Phuket', 'Rome', 'Tokyo', 'Pattaya', 'Taipei', 'Mecca', 'Guangzhou', 'Prague', 'Medina', 'Seoul', 'Amsterdam', 'Agra', 'Miami', 'Osaka', 'Las Vegas', 'Shanghai', 'Ho Chi Minh City', 'Denpasar', 'Barcelona', 'Los Angeles', 'Milan', 'Chennai', 'Vienna', 'Johor Bahru', 'Jaipur', 'Cancún', 'Berlin', 'Cairo', 'Orlando', 'Moscow', 'Venice', 'Madrid', 'Ha Long', 'Riyadh', 'Dublin', 'Florence', 'Jerusalem', 'Hanoi', 'Toronto', 'Johannesburg', 'Sydney', 'Munich', 'Jakarta', 'Beijing', 'Saint Petersburg', 'Brussels', 'Budapest', 'Lisbon', 'Dammam', 'Penang Island', 'Heraklion', 'Kyoto', 'Zhuhai', 'Vancouver', 'Chiang Mai', 'Copenhagen', 'San Francisco', 'Melbourne', 'Warsaw', 'Marrakesh', 'Kolkata', 'Cebu City', 'Auckland', 'Tel Aviv', 'Guilin', 'Honolulu', 'Hurghada', 'Kraków', 'Muğla', 'Buenos Aires', 'Chiba', 'Frankfurt am Main', 'Stockholm', 'Lima', 'Da Nang', 'Batam', 'Nice', 'Fukuoka', 'Abu Dhabi', 'Jeju', 'Porto', 'Rhodes', 'Rio de Janeiro', 'Krabi', 'Bangalore', 'Mexico City']