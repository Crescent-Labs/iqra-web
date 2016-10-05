import { connect } from 'react-redux';
import ResultList from '../components/ResultList.jsx';
import { updateResultsFilter, updateResultsPageNum, updateTranslationResults }
    from '../actions/results';
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
    const pageNum = state.resultPageNum;
    const paginatedResults = filteredResults.slice((100 * pageNum) - 100, 100 * pageNum);

    return {
        query: state.query,
        results: paginatedResults,
        numOfResults: filteredResults.length,
        filter,
        pageNum,
        numOfPages: Math.ceil(filteredResults.length / 100),
        showPagination: filteredResults.length > 100,
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
    updatePageNumber: (pageNum) => {
        dispatch(updateResultsPageNum(pageNum));
    },
    changeTranslation: (translation) => {
        dispatch(updateTranslationResults(translation));
    },
});

const ResultListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultList);

export default ResultListContainer;
