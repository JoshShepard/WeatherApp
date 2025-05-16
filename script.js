// Form element for user submission
const userForm = document.getElementById('city-form');

/*
    Event listener for form submission
    Call preventDefault() on event to stop refresh on submission.
*/ 
userForm.addEventListener('submit', e => {
    // Stops page from refreshing
    e.preventDefault();

    // Input Element - used to grab user input
    const userInputElement = document.getElementById('city-search');
    // Save user input 
    const userInput = userInputElement.value;

    console.log(userInput);
});
