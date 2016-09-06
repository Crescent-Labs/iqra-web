export const UPDATE_RESULTS_FILTER = 'UPDATE_RESULTS_FILTER';
export function updateResultsFilter(filter) {
    return {
        type: UPDATE_RESULTS_FILTER,
        filter,
    };
}

export const OPEN_RESULT_MODAL = 'OPEN_RESULT_MODAL';
export function openResultModal(resultObject) {
    return {
        type: OPEN_RESULT_MODAL,
        resultObject,
    };
}

export const CLOSE_RESULT_MODAL = 'CLOSE_RESULT_MODAL';
export function closeResultModal() {
    return {
        type: CLOSE_RESULT_MODAL,
    };
}
