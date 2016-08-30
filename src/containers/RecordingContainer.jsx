import { connect } from 'react-redux';
import { startRecording, updateRecordMessage, updateRecognizingState,
    setUnableToRecord, updateQuery, updatePartialQuery } from '../actions/recording';
import Recording from '../components/Recording.jsx';


const mapStateToProps = (state) => ({
    canRecord: state.canRecord,
    recording: state.recording,
    recordMessage: state.recordMessage,
    startRecognitionTime: state.startRecognitionTime,
    query: state.query,
    partialQuery: state.partialQuery,
});

const mapDispatchToProps = (dispatch) => ({
    startRecording: () => {
        dispatch(startRecording());
    },
    updateRecordMessage: (message) => {
        dispatch(updateRecordMessage(message));
    },
    updateRecognizingState: (isRecognizing) => {
        dispatch(updateRecognizingState(isRecognizing));
    },
    updateQuery: (query) => {
        dispatch(updateQuery(query));
    },
    updatePartialQuery: (partialQuery) => {
        dispatch(updatePartialQuery(partialQuery));
    },
    upgradeRequired: () => {
        dispatch(setUnableToRecord());
    },
});

const RecordingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Recording);

export default RecordingContainer;
