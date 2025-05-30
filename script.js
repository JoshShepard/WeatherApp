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
        *Space needs special characters in url*
     */
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;


    /*
        try/catch block handles potential errors during the API call.
        await is used to pause execution of THIS async function until the fetch and JSON parsing completes. While waiting, the rest of the program can continue executing other tasks. 
    */
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Logging if there is an error with the data being returned
        if (data.error) {
            console.log('Error during api call for data');
        }

        // Log data object
        console.log(data);
        
        // Main calling function that calls helper functions using the data object
        displayWeather(data);


    } catch (error) {
        console.error('Error loading weather details...', error);
    }
}


/*
    API call to get the 7 day forecast
    **Can be used for hourly forecast as well**
*/
const getForecast = async () => {
    const cityValue = userInputElement.value;
    const days = 7;

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityValue)}&days=${days}`;

    try {
        const response = await fetch(url);
        const forecast = await response.json();
        // console.log(forecast);
    } catch (error) {
        console.error('Error loading forecast details', error);
    }
}

/*
    displayLocation(location) 
    location -> location parameter is an object stored inside the weather object returned from the API call. 
    Location icon, city, and country will be displayed at top for no confusion of where the weather is from.
*/
const displayLocation = location => {
    // Create location container
    const locationSection = document.createElement('section');
    locationSection.classList.add('locationSection');

    // Create location icon, assign class
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-location-dot', 'locationIcon');

    // Create location paragraph, assign class, display data
    const cityResult = document.createElement('p');
    cityResult.classList.add('locationText');
    cityResult.innerText = `${location.name}, ${location.region}, ${location.country}`;

    // Append location data to container
    locationSection.appendChild(icon);
    locationSection.appendChild(cityResult);

    // Append location container to main container(dashboard)
    mainContainer.appendChild(locationSection);
}

/*
    displayTemperature(current)
    current -> current parameter is an object stored inside the weather object returned from the API call.  
    Use this parameter to grab current temperature and display it in the dashboard

    ***TODO: Once dashboard is completed, change this function to allow for C/F toggle***
*/
const displayWeatherCondition = current => {
    // Create weather condition container
    const weatherConditionSection = document.createElement('section');
    weatherConditionSection.classList.add('weatherConditionSection');

    // Create temp paragraph element, assign class, display data
    const temp = document.createElement('p');
    temp.classList.add('temp');
    temp.innerText = `${current.temp_f}`;

    // Create weather description
    const weatherDescription = document.createElement('p');
    weatherDescription.classList.add('weatherDescription');
    weatherDescription.innerText = `${current.condition.text}`;

    // Append weather condition data to container
    weatherConditionSection.appendChild(temp);
    weatherConditionSection.appendChild(weatherDescription);

    // Append condition to main container(dashboard)
    mainContainer.appendChild(weatherConditionSection);
}

/*
    displayWeatherImage(current)
    current -> current parameter is an object stored inside the weather object returned from the API call.  
    Use this parameter to grab current weather img src and display it in the dashboard
*/

const displayWeatherImage = current => {
    // Create weather image section
    const weatherImageSection = document.createElement('section');
    weatherImageSection.classList.add('weatherImageSection');

    // Create image element, assign class, display data
    const weatherImage = document.createElement('img');
    weatherImage.classList.add('weatherImage');
    weatherImage.alt = 'Animated picture of the current weather';
    weatherImage.src = `${current.condition.icon}`;

    // Append weather image to section
    weatherImageSection.appendChild(weatherImage);

    // Append image section to main container(dashboard)
    mainContainer.appendChild(weatherImageSection);
}

/*
    displayWind(current)
    current -> current parameter is an object stored inside the weather object returned from the API call.  
    Use this parameter to grab current wind (mph) **toggle for kmh/mph??**
*/
const displayWind = current => {
    // Container for wind
    const windContainer = document.createElement('div');
    windContainer.classList.add('windContainer');

    // Wind header
    const windHeader = document.createElement('div')
    windHeader.classList.add('windHeader');
    const windIcon = document.createElement('i');
    windIcon.classList.add('fa-solid', 'fa-wind');
    const wind = document.createElement('p');
    wind.innerText = `Wind`;
    windHeader.appendChild(windIcon);
    windHeader.appendChild(wind);

    // Wind Measurement
    const windDetails = document.createElement('p');
    windDetails.classList.add('windDetails');
    windDetails.innerText = `${current.wind_mph}mph`;

    // Add wind details to container
    windContainer.appendChild(windHeader);
    windContainer.appendChild(windDetails);

    return windContainer;
}

/*
    displayHumidity(current)
    current -> current parameter is an object stored inside the weather object returned from the API call.  
    Use this parameter to grab current humidity(percentage)
*/
const displayHumidity = current => {
    // Container for humidity
    const humidityContainer = document.createElement('div');
    humidityContainer.classList.add('humidityContainer');

    // Humidity header
    const humidityHeader = document.createElement('div');
    humidityHeader.classList.add('humidityHeader');
    const humidityIcon = document.createElement('i');
    humidityIcon.classList.add('fa-solid', 'fa-droplet');
    const humidityTitle = document.createElement('p');
    humidityTitle.innerText = `Humidity`;
    humidityHeader.appendChild(humidityIcon);
    humidityHeader.appendChild(humidityTitle);

    // Humidity Measurement
    const humidity = document.createElement('p');
    humidity.classList.add('humidity');
    humidity.innerText = `${current.humidity}%`;

    // Add humidity deatils to container
    humidityContainer.appendChild(humidityHeader);
    humidityContainer.appendChild(humidity);

    return humidityContainer;
}

/*
    displayDetails(current)
    current -> current parameter is an object stored inside the weather object returned from the API call.  
    and humidity and display it in the dashboard
*/
const displayDetails = current => {
    // Create wind + humidity section
    const detailSection = document.createElement('section');
    detailSection.classList.add('detailSection');

    // Get weather data
    const windValue = displayWind(current);
    const humidityValue = displayHumidity(current);

    // Add details to section
    detailSection.appendChild(windValue);
    detailSection.appendChild(humidityValue);

    // Add details to main container(dashboard)
    mainContainer.appendChild(detailSection);
}

/*
    displayWeather(data)
    data -> is the object returned from the api call. 
    Controller function to get data weather and call helper functions to create dashboard

    FIXME: Allow for more searches again after dashboard display is done
*/
const displayWeather = data => {
    // Clear mainContainer (Single page application)
    mainContainer.innerHTML = '';

    // Display weather dashboard
    displayLocation(data.location);
    displayWeatherCondition(data.current);
    displayWeatherImage(data.current);
    displayDetails(data.current);
}

