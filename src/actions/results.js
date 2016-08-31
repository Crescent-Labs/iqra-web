export const UPDATE_RESULTS_FILTER = 'UPDATE_RESULTS_FILTER';
export function updateResultsFilter(filter) {
    return {
        type: UPDATE_RESULTS_FILTER,
        filter,
    };
}
