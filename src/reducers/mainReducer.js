import { START_RECORDING, UPDATE_RECORD_MESSAGE, UPDATE_RECOGNIZING_STATE,
    SET_UNABLE_TO_RECORD, GET_SEARCH_RESULTS_REQUEST, GET_SEARCH_RESULTS_SUCCESS,
    GET_SEARCH_RESULTS_FAILURE, UPDATE_PARTIAL_QUERY, RESET_SEARCH }
    from '../actions/recording';
import { UPDATE_RESULTS_FILTER, UPDATE_RESULTS_PAGE_NUM, OPEN_RESULT_MODAL, CLOSE_RESULT_MODAL }
    from '../actions/results';

const initialState = {
    canRecord: true,
    recording: false,
    recordMessage: 'Tap on the mic and recite a full or partial verse',
    startRecognitionTime: -1,
    partialQuery: '',
    query: '',
    isLoading: false,
    results: [],
    resultFilter: '',
    resultPageNum: 1,
    isModalShown: false,
    resultObject: {},
};

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
    case START_RECORDING:
        return Object.assign({}, state, {
            recording: true,
            recordMessage: 'Begin reciting',
            startRecognitionTime: action.time,
            query: '',
            results: [],
        });
    case UPDATE_RECORD_MESSAGE:
        return Object.assign({}, state, { recordMessage: action.message });
    case UPDATE_RECOGNIZING_STATE:
        return Object.assign({}, state, { recording: action.isRecognizing });
    case SET_UNABLE_TO_RECORD:
        return Object.assign({}, state, { canRecord: false });
    case GET_SEARCH_RESULTS_REQUEST:
        return Object.assign({}, state, {
            query: action.query,
            isLoading: true,
            recording: false,
        });
    case GET_SEARCH_RESULTS_SUCCESS:
        return Object.assign({}, state, {
            results: action.matches,
            query: action.query,
            isLoading: false,
        });
    case GET_SEARCH_RESULTS_FAILURE:
        return Object.assign({}, state, { isLoading: false });
    case UPDATE_PARTIAL_QUERY:
        return Object.assign({}, state, { partialQuery: action.query });
    case RESET_SEARCH:
        return Object.assign({}, initialState, { canRecord: state.canRecord });
    case UPDATE_RESULTS_FILTER:
        return Object.assign({}, state, {
            resultFilter: action.filter,
            resultPageNum: 1,
        });
    case UPDATE_RESULTS_PAGE_NUM:
        return Object.assign({}, state, { resultPageNum: action.pageNum });
    case OPEN_RESULT_MODAL:
        return Object.assign({}, state, {
            isModalShown: true,
            resultObject: action.resultObject,
        });
    case CLOSE_RESULT_MODAL:
        return Object.assign({}, state, { isModalShown: false });
    default:
        return state;
    }
}
