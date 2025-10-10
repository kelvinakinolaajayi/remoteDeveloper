import {
    BASE_API_URL,
    state,
    jobListSearchEl,
    jobDetailsContentEl,
    getData
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

const renderJobList = jobItems => {
    // Remove previous job items
    jobListSearchEl.innerHTML = '';
    
    state.searchJobItems.slice(0, 7).forEach(jobItem => {
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
};

// -- JOB LIST COMPONENT --
const clickHandler = async event => {
    // Prevent default behaviour (navigate)
    event.preventDefault();

    // Get clicked job item element
    const jobItemEl = event.target.closest('.job-item');

    // Remove the active class from previously active job item
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    // Add active class
    jobItemEl.classList.add('job-item--active');

    // Empty the job detail section
    jobDetailsContentEl.innerHTML = '';

    // Render spinner
    renderSpinner('job-details');

    // Get the ID of the job item clicked
    const id = jobItemEl.children[0].getAttribute('href');

    // Fetch the job item data
    try {
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);

        // Extract job item
        const { jobItem } = data;
    
        // Remove spinner
        renderSpinner('job-details');
    
        // Render the job details
        renderJobDetails(jobItem); 
    } catch (error) {
        renderSpinner('job-details');
        renderError(error.message);
    }
}


jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;