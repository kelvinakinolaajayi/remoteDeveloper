import {
    BASE_API_URL,
    state,
    jobDetailsContentEl,
    getData
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

const loadHashChangeHandler = async () => {
    // Get id from the url    
    const id = window.location.hash.substring(1);

    if (id) {
        // Remove previous job details content
        jobDetailsContentEl.innerHTML = '';

        // Add spinner
        renderSpinner('job-details');

        try {
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
            // Extract job item
            const { jobItem } = data;

            // Update state
            state.activeJobItem = jobItem;
        
            // Remove spinner
            renderSpinner('job-details');
        
            // Render the job details
            renderJobDetails(jobItem); 
        } catch (error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);