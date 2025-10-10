import {
    RESULTS_PER_PAGE,
    state,
    paginationEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    paginationBtnNextEl,
    paginationBtnBackEl
} from '../common.js';
import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
    // Display the back button if we are on page 2 or further
    if (state.currentPage >= 2) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    // Display next button if there are more job items on the next page
    if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0 ) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    // Update the page numbers
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    // Unfocus ('blur') buttons
    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();
};

const clickHandler = event => {
    // Find the button that was clicked
    const clickButtonEl = event.target.closest('.pagination__button');

    // Stop the function if null
    if (!clickButtonEl) return;

    // Check if intention is to go the next or back
    const nextPage = clickButtonEl.className.includes('--next') ? true : false;

    // Update the state
    nextPage ? state.currentPage++ : state.currentPage--;

    // Render paginaion buttons
    renderPaginationButtons();

    // Render job items for tht page
    renderJobList();
}

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;