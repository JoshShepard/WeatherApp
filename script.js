// Form element for user submission
const userForm = document.getElementById('city-form');

// Input Element - used to grab user input
const userInputElement = document.getElementById('city-search');

// Main Container - used for displaying weather dashboard
const mainContainer = document.getElementById('mainContainer');


/*
Event listener for form submission
Call preventDefault() on event to stop refresh on submission.
*/ 
userForm.addEventListener('submit', e => {
    // Stops page from refreshing
    e.preventDefault();
    getWeather();
    getForecast();
});

const getWeather = async () => {
    // User input (city)
    const city = userInputElement.value;
    /*
        API Call url, uses generated API Key and user input(city) as parameters

        encodeURIComponent(city) is used for parts of a URL like parameters. This helps ensure valid urls (spaces)
        EX. user input = 'New York'
        Space needs special characters in url
     */
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.log('Error during api call for data');
        }

        console.log(data);
        
        displayWeather(data);


    } catch (error) {
        console.error('Error loading weather details', error);
    }
}

const getForecast = async () => {
    const cityValue = userInputElement.value;
    const days = 6;

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityValue)}&days=${days}`;

    try {
        const response = await fetch(url);
        const forecast = await response.json();
        console.log(forecast);
    } catch (error) {
        console.error('Error loading forecast details', error);
    }
}

/*
    displayLocation(location) 
    location -> location arguement is going to be from weather object (data) that was retrieved from the api call. 
    Location icon, city, region, country will be displayed at top for no confusion of where the weather is from.
*/
const displayLocation = location => {
    // Create location container
    const locationContainer = document.createElement('div');
    locationContainer.classList.add('locationContainer');

    // Create location icon
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-location-dot', 'icon');

    // Create location element
    const cityResult = document.createElement('p');
    cityResult.classList.add('locationText');
    cityResult.innerText = `${location.name}, ${location.region}, ${location.country}`;

    // Append location data to container
    locationContainer.appendChild(icon);
    locationContainer.appendChild(cityResult);

    // Clear mainContainer - Remove user form for now / clear element
    mainContainer.innerHTML = '';

    // Append location container
    mainContainer.appendChild(locationContainer);
}

/*
    Grabbing the tempature, description, wind, humidity, and icon?

    REWRITE COMMENT ONCE IT WORKS!
*/
const displayWeatherInformation = current => {
    const currentContainer = document.createElement('div');
    currentContainer.classList.add('currentContainer');

    // temperature
    const weatherTemperature = document.createElement('p');
    weatherTemperature.classList.add('tempatureText');
    weatherTemperature.innerText = `${current.temp_f}`;

    // weather condition - text
    const weatherConditionText = document.createElement('p');
    weatherConditionText.classList.add('weatherConditionText');
    weatherConditionText.innerText = `${current.condition.text}`

    // image/icon
    const weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weatherIcon');
    weatherIcon.src = `${current.condition.icon}`;
    
    // Wind
    const wind = document.createElement('p');
    wind.classList.add('wind');
    wind.innerText = `${current.wind_mph}`;

    // humidity
    const humidity = document.createElement('p');
    humidity.classList.add('humidity');
    humidity.innerText = `${current.humidity}%`;

    mainContainer.appendChild(weatherTemperature);
    mainContainer.appendChild(weatherConditionText);
    mainContainer.appendChild(weatherIcon);
    mainContainer.appendChild(wind);
    mainContainer.appendChild(humidity);
}

/*
    displayWeather(data)
    data -> is the object returned from the api call. 
    Parse through data object to get weather info and create a sleek UI

    FIXME: Allow for more searches again after dashboard display is done
*/
const displayWeather = data => {
    displayLocation(data.location);
    displayWeatherInformation(data.current);
}

