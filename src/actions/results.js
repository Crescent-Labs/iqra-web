import { getCookie } from '../utils/Network';

export const UPDATE_RESULTS_FILTER = 'UPDATE_RESULTS_FILTER';
export function updateResultsFilter(filter) {
    return {
        type: UPDATE_RESULTS_FILTER,
        filter,
    };
}

export const UPDATE_RESULTS_PAGE_NUM = 'UPDATE_RESULTS_PAGE_NUM';
export function updateResultsPageNum(pageNum) {
    return {
        type: UPDATE_RESULTS_PAGE_NUM,
        pageNum,
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

export const UPDATE_TRANSLATION_RESULTS_REQUEST = 'UPDATE_TRANSLATION_RESULTS_REQUEST';
function updateTranslationResultsRequest() {
    return {
        type: UPDATE_TRANSLATION_RESULTS_REQUEST,
    };
}

export const UPDATE_TRANSLATION_RESULTS_SUCCESS = 'UPDATE_TRANSLATION_RESULTS_SUCCESS';
function updateTranslationResultsSuccess(json) {
    return {
        type: UPDATE_TRANSLATION_RESULTS_SUCCESS,
        ayahs: json.result,
    };
}

export const UPDATE_TRANSLATION_RESULTS_FAILURE = 'UPDATE_TRANSLATION_RESULTS_FAILURE';
function updateTranslationResultsFailure() {
    return {
        type: UPDATE_TRANSLATION_RESULTS_FAILURE,
    };
}

export function updateTranslationResults(translation) {
    return (dispatch, getState) => {
        dispatch(updateTranslationResultsRequest());

        const { results } = getState();
        const ayahs = [];
        results.forEach(result => {
            ayahs.push({
                surahNum: result.surahNum,
                ayahNum: result.ayahNum,
            });
        });

        const body = JSON.stringify({
            ayahs,
            translation,
            _csrf_token: getCookie('_csrf_token'),
        });
        const options = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            method: 'POST',
            body,
        };

        return fetch('/translations', options)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            })
            .then(json => {
                console.log(json.result);
                dispatch(updateTranslationResultsSuccess(json));
            })
            .catch(error => {
                console.log(error);
                dispatch(updateTranslationResultsFailure());
            });
    };
}
