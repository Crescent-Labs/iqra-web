import { connect } from 'react-redux';
import ResultModal from '../components/ResultModal.jsx';
import { closeResultModal } from '../actions/results';


const mapStateToProps = (state) => ({
    showModal: state.showModal,
    resultObject: state.resultObject,
});

const mapDispatchToProps = (dispatch) => ({
    closeResultModal: () => {
        dispatch(closeResultModal());
    },
});

const ResultModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultModal);

export default ResultModalContainer;
