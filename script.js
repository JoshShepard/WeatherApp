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
    displayDetails(current)
    current -> current parameter is an object stored inside the weather object returned from the API call.  
    Use this parameter to grab current wind (mph) and humidity and display it in the dashboard
    ******************************************************************************************* 
    Stopping for the night
                    - Find wind icon
                    - Find humidity icon
                    - create titles for stats
                    -display stats
    *******************************************************************************************
    ***TODO: Once dashboard is completed, change to allow toggle for mph/kph***
*/
const displayDetails = current => {
    
}

/*
    Grabbing the tempature, description, wind, humidity, and icon?

    REWRITE COMMENT ONCE IT WORKS!
*/
const displayWeatherInformation = current => {
    const currentContainer = document.createElement('div');
    currentContainer.classList.add('currentContainer');
    
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
    // Clear mainContainer (Single page application)
    mainContainer.innerHTML = '';

    // Display weather dashboard
    displayLocation(data.location);
    displayWeatherCondition(data.current);
    displayWeatherImage(data.current);
    displayWeatherInformation(data.current);
}

