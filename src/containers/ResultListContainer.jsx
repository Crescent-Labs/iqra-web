import { connect } from 'react-redux';
import ResultList from '../components/ResultList.jsx';
import { updateResultsFilter } from '../actions/results';
import { getSearchResults } from '../actions/recording';
import _ from 'lodash';


const mapStateToProps = (state) => {
    const filter = state.resultFilter.toLowerCase();
    const filteredResults = _.filter(state.results, result => {
        const { surahNum, ayahNum, arabicSurahName, translationSurahName, arabicAyah,
            translationAyah } = result;
        return `${surahNum}:${ayahNum}`.indexOf(filter) > -1
            || arabicSurahName.indexOf(filter) > -1
            || translationSurahName.toLowerCase().indexOf(filter) > -1
            || arabicAyah.indexOf(filter) > -1
            || translationAyah.toLowerCase().indexOf(filter) > -1;
    });

    return {
        query: state.query,
        results: filteredResults,
        filter,
        isLoading: state.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onFilter: (newFilter) => {
        dispatch(updateResultsFilter(newFilter));
    },
    fetchOldResults: (query) => {
        dispatch(getSearchResults(query));
    },
});

const ResultListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultList);

export default ResultListContainer;
