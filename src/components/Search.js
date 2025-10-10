import {
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

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

    // Resert sorting button after new search
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    // Render the spinner element
    renderSpinner('search');

    // Fetch the search results
    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
        console.log(data)

         // Extract job items only
        const { jobItems } = data;

        // Update state
        state.searchJobItems = jobItems;
        state.currentPage = 1;

        // Remove the spinner
        renderSpinner('search');

        // Render the number of results
        numberEl.textContent = jobItems.length;

        // Reset pagination buttons
        renderPaginationButtons();

        // Render job items in search job list
        renderJobList(jobItems);
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }
};

searchFormEl.addEventListener('submit', submitHandler);

export default renderError;