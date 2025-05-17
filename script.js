// Form element for user submission
const userForm = document.getElementById('city-form');

// Input Element - used to grab user input
const userInputElement = document.getElementById('city-search');

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
        // displayWeather(data);


    } catch (error) {
        console.error('Error loading weather details', error);
    }
}

/*
    displayWeather(data)
    data -> is the object returned from the api call. 
    Parse through data object to get weather info and create a sleek UI
*/
const displayWeather = data => {
    
}

