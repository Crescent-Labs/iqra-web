import { connect } from 'react-redux';
import Result from '../components/Result.jsx';
import { openResultModal } from '../actions/results';


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    openResultModal: (resultObject) => {
        dispatch(openResultModal(resultObject));
    },
});

const ResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Result);

export default ResultContainer;
