import {
    state,
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js'
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const clickHandler = event => {
    // Get clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button');

    // Stop function if no clicked button element
    if (!clickedButtonEl) return;

    // Update the state (reset to page one)
    state.currentPage = 1;

    // Check if intention is recent or relevant sorting
    const recent = clickedButtonEl.className.includes('--recent') ? true : false;

    // Make sorting button look (in)active
    if (recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    // Sort job items
    if (recent) {
        state.searchJobItems.sort((a,b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a,b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    }

    // Reset the pagination buttons
    renderPaginationButtons();

    // Render job items in list
    renderJobList();
};

sortingEl.addEventListener('click', clickHandler)