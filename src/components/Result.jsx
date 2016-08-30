import React, { Component, PropTypes } from 'react';


export default class Result extends Component {
    render() {
        const { surahNum, ayahNum, arabicSurahName, translationSurahName } = this.props;
        // arabicAyah and translationAyah also available from props

        return (
            <div className="result-box">
                <div className="surah-name">
                    <p>{arabicSurahName}</p>
                    <p>{translationSurahName}</p>
                </div>
                <span className="surah-index">{surahNum}:{ayahNum}</span>
            </div>
        );
    }
}

Result.propTypes = {
    surahNum: PropTypes.number.isRequired,
    ayahNum: PropTypes.number.isRequired,
    arabicSurahName: PropTypes.string.isRequired,
    translationSurahName: PropTypes.string.isRequired,
    arabicAyah: PropTypes.string.isRequired,
    translationAyah: PropTypes.string.isRequired,
};
