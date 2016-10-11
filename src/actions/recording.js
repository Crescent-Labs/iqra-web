import fetch from 'isomorphic-fetch';
import { getCookie } from '../utils/Network';

export const START_RECORDING = 'START_RECORDING';
export function startRecording() {
    return {
        type: START_RECORDING,
        time: Date.now(),
    };
}

export const UPDATE_RECORD_MESSAGE = 'UPDATE_RECORD_MESSAGE';
export function updateRecordMessage(message) {
    return {
        type: UPDATE_RECORD_MESSAGE,
        message,
    };
}

export const UPDATE_RECOGNIZING_STATE = 'UPDATE_RECOGNIZING_STATE';
export function updateRecognizingState(isRecognizing) {
    return {
        type: UPDATE_RECOGNIZING_STATE,
        isRecognizing,
    };
}

export const SET_UNABLE_TO_RECORD = 'SET_UNABLE_TO_RECORD';
export function setUnableToRecord() {
    return {
        type: SET_UNABLE_TO_RECORD,
    };
}

export const GET_SEARCH_RESULTS_REQUEST = 'GET_SEARCH_RESULTS_REQUEST';
function getSearchResultsRequest(query) {
    return {
        type: GET_SEARCH_RESULTS_REQUEST,
        query,
    };
}

export const GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS';
function getSearchResultsSuccess(json) {
    localStorage.setItem('query', json.result.queryText);
    return {
        type: GET_SEARCH_RESULTS_SUCCESS,
        matches: json.result.matches,
        query: json.result.queryText,
    };
}

export const GET_SEARCH_RESULTS_FAILURE = 'GET_SEARCH_RESULTS_FAILURE';
function getSearchResultsFailure() {
    return {
        type: GET_SEARCH_RESULTS_FAILURE,
    };
}

export function getSearchResults(query) {
    return dispatch => {
        dispatch(getSearchResultsRequest(query));

        const translation = localStorage.getItem('translation') || 'en-hilali';

        const body = JSON.stringify({
            arabicText: query,
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

        return fetch('/search', options)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            })
            .then(json => {
                dispatch(getSearchResultsSuccess(json));
            })
            .catch(error => {
                console.log(error);
                dispatch(getSearchResultsFailure());
            });
    };
}

export const UPDATE_PARTIAL_QUERY = 'UPDATE_PARTIAL_QUERY';
export function updatePartialQuery(query) {
    return {
        type: UPDATE_PARTIAL_QUERY,
        query,
    };
}

export const RESET_SEARCH = 'RESET_SEARCH';
export function resetSearch() {
    return { type: RESET_SEARCH };
}
