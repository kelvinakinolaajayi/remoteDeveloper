import {
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';

// -- SEARCH COMPONENT
const submitHandler = async event => {
    // Prevent default submit form behaviour
    event.preventDefault();

    // Get search text
    const searchText = searchInputEl.value;

    // Validation (Regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    // Blur the input after searching
    searchInputEl.blur();

    // Remove previous job items
    jobListSearchEl.innerHTML = '';

    // Render the spinner element
    renderSpinner('search');

    // Fetch the search results
    try {
        const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        const data = await response.json();

        if (!response.ok) { // 4xx, 5xx status code
            throw new Error(data.description);
        }

         // Extract job items only
        const { jobItems } = data;

        // Remove the spinner
        renderSpinner('search');

        // Render the number of results
        numberEl.textContent = jobItems.length;

        // Render job items in search job list
        renderJobList(jobItems);
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }
};

searchFormEl.addEventListener('submit', submitHandler);

export default renderError;