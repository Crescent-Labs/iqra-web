import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Result from './Result.jsx';


export default class ResultList extends Component {
    constructor() {
        super();
        this.onFilter = this.onFilter.bind(this);
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

    render() {
        const resultList = this.props.results.map(result => (
            <Result
                key={`${result.surahNum}-${result.ayahNum}`}
                surahNum={result.surahNum}
                ayahNum={result.ayahNum}
                arabicSurahName={result.arabicSurahName}
                translationSurahName={result.translationSurahName}
                arabicAyah={result.arabicAyah}
                translationAyah={result.translationAyah}
            />
        ));

        const resultCount = this.props.results.length;
        const resultCountText = resultCount === 1 ? 'result' : 'results';

        return (
            <div className="result-page">
                <p className="result-query">{this.props.query}</p>
                <p className="result-count">{resultCount} {resultCountText}</p>
                <input
                    placeholder="filter results"
                    className="result-filter"
                    onChange={this.onFilter}
                    value={this.props.filter}
                />
                <div className="result-list">
                    {resultList}
                </div>
            </div>
        );
    }
}

ResultList.propTypes = {
    query: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    onFilter: PropTypes.func.isRequired,
    fetchOldResults: PropTypes.func.isRequired,
};
