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
        
        // TODO: Create displayWeather function, model styling off of weather app inspiration. Remember to still use styling in css file so give id/class names
        displayWeather(data);


    } catch (error) {
        console.error('Error loading weather details', error);
    }
}

/*
    displayLocation(location) 
    location -> location arguement is going to be from weather object (data) that was retrieved from the api call. 
    Location icon, city, region, country will be displayed at top for no confusion of where the weather is from.
*/

const displayLocation = location => {
    // Location container
    const locationContainer = document.createElement('div');
    locationContainer.classList.add('locationContainer');

    // Location icon
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-location-dot', 'icon');

    // Location city
    const cityResult = document.createElement('p');
    cityResult.classList.add('locationText');
    cityResult.innerText = `${location.name}, ${location.region}, ${location.country}`;

    // Append location data to container
    locationContainer.appendChild(icon);
    locationContainer.appendChild(cityResult);

    mainContainer.innerHTML = '';

    mainContainer.appendChild(locationContainer);
}

/*
    displayWeather(data)
    data -> is the object returned from the api call. 
    Parse through data object to get weather info and create a sleek UI

    FIXME: Allow for more searches again after dashboard display is done
*/
const displayWeather = data => {
    displayLocation(data.location);
}

