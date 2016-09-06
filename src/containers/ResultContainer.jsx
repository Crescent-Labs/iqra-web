import { connect } from 'react-redux';
import Result from '../components/Result.jsx';
import { openResultModal, closeResultModal } from '../actions/results';


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    openResultModal: (resultObject) => {
        dispatch(openResultModal(resultObject));
    },
    closeResultModal: () => {
        dispatch(closeResultModal());
    },
});

const ResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Result);

export default ResultContainer;
