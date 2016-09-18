import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ReactPaginate from 'react-paginate';
import Loader from './Loader.jsx';
import ResultContainer from '../containers/ResultContainer.jsx';


export default class ResultList extends Component {
    constructor() {
        super();
        this.onFilter = this.onFilter.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        if (!this.props.query) {
            const oldQuery = localStorage.getItem('query');
            if (oldQuery) {
                this.props.fetchOldResults(oldQuery);
            } else {
                browserHistory.push('/app/search');
            }
        }
    }

    onFilter(event) {
        this.props.onFilter(event.target.value);
    }

    handlePageClick(data) {
        this.props.updatePageNumber(data.selected + 1);
    }

    render() {
        const resultList = this.props.results.map(result => (
            <ResultContainer
                key={`${result.surahNum}-${result.ayahNum}`}
                surahNum={result.surahNum}
                ayahNum={result.ayahNum}
                arabicSurahName={result.arabicSurahName}
                translationSurahName={result.translationSurahName}
                arabicAyah={result.arabicAyah}
                translationAyah={result.translationAyah}
            />
        ));

        const resultCount = this.props.numOfResults;
        const resultCountText = resultCount === 1 ? 'result' : 'results';

        return (
            <div className="result-page">
                <p className="result-query">{this.props.query}</p>
                <p className="result-count">{resultCount} {resultCountText}</p>
                <input
                    placeholder="Filter Results"
                    className="result-filter"
                    onChange={this.onFilter}
                    value={this.props.filter}
                />
                <div className="result-list">
                    {resultList}
                </div>
                {this.props.showPagination &&
                    <ReactPaginate
                        previousLabel="previous"
                        nextLabel="next"
                        breakLabel="..."
                        breakClassName="pagination-break"
                        pageNum={this.props.numOfPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        initialSelected={this.props.pageNum - 1}
                        forceSelected={this.props.pageNum - 1}
                        clickCallback={this.handlePageClick}
                        containerClassName="pagination"
                        pageClassName="pagination-number"
                        activeClassName="active"
                    />
                }
                {this.props.isLoading && <Loader />}
            </div>
        );
    }
}

ResultList.propTypes = {
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    numOfResults: PropTypes.number.isRequired,
    showPagination: PropTypes.bool.isRequired,
    numOfPages: PropTypes.number.isRequired,
    pageNum: PropTypes.number.isRequired,
    onFilter: PropTypes.func.isRequired,
    fetchOldResults: PropTypes.func.isRequired,
    updatePageNumber: PropTypes.func.isRequired,
};
