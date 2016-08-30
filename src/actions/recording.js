import fetch from 'isomorphic-fetch';

function getCookie(cname) {
    const name = `${cname}=`;
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
}

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
    return {
        type: GET_SEARCH_RESULTS_SUCCESS,
        matches: json.result.matches,
    };
}

export const GET_SEARCH_RESULTS_FAILURE = 'GET_SEARCH_RESULTS_FAILURE';
function getSearchResultsFailure() {
    return {
        type: GET_SEARCH_RESULTS_FAILURE,
    };
}

export const UPDATE_QUERY = 'UPDATE_QUERY';
export function updateQuery(query) {
    return dispatch => {
        dispatch(getSearchResultsRequest(query));

        const body = JSON.stringify({
            arabicText: query,
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
                console.log(json.result.matches);
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
