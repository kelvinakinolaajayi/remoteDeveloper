import {
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    jobListSearchEl,
    numberEl
} from '../common.js';

// -- SEARCH COMPONENT
const submitHandler = event => {
    // Prevent default submit form behaviour
    event.preventDefault();

    // Get search text
    const searchText = searchInputEl.value;

    // Validation (Regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorTextEl.textContent = 'Your search may not contain numbers';
        errorEl.classList.add('error--visible');
        setTimeout(() => {
            errorEl.classList.remove('error--visible');
        }, 3500)
    }

    // Blur the input after searching
    searchInputEl.blur();

    // Remove previous job items
    jobListSearchEl.innerHTML = '';

    // Render the spinner element
    spinnerSearchEl.classList.add('spinner--visible');

    // Fetch the search results
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
        .then( response => {
            if (!response.ok) {
                console.log('Something went wrong');
                return;
            }

            return response.json();
        })
        .then(data => {
            // Extract job items only
            const { jobItems } = data;

            // Remove the spinner
            spinnerSearchEl.classList.remove('spinner--visible');

            // Render the number of results
            numberEl.textContent = jobItems.length;

            // Render job items in search job list
            jobItems.slice(0, 7).forEach(jobItem => {
                const newJobItemHTML = `
                <li class="job-item">
                    <a class="job-item__link" href="${jobItem.id}">
                        <div class="job-item__badge">${jobItem.badgeLetters}</div>
                        <div class="job-item__middle">
                            <h3 class="third-heading">${jobItem.title}</h3>
                            <p class="job-item__company">${jobItem.company}</p>
                            <div class="job-item__extras">
                                <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                                <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                                <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                            </div>
                        </div>
                        <div class="job-item__right">
                            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                            <time class="job-item__time">${jobItem.daysAgo}d</time>
                        </div>
                    </a>
                </li>
                `;
                jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
            });
        })
        .catch(error => console.log(error));
};

searchFormEl.addEventListener('submit', submitHandler);