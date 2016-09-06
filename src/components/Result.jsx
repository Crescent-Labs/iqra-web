import React, { Component, PropTypes } from 'react';


export default class Result extends Component {
    constructor() {
        super();
        this.openResultModal = this.openResultModal.bind(this);
    }

    openResultModal() {
        const {
            surahNum,
            ayahNum,
            arabicSurahName,
            translationSurahName,
            arabicAyah,
            translationAyah,
        } = this.props;
        const resultObject = {
            surahNum,
            ayahNum,
            arabicSurahName,
            translationSurahName,
            arabicAyah,
            translationAyah,
        };
        this.props.openResultModal(resultObject);
    }

    render() {
        const {
            surahNum,
            ayahNum,
            arabicSurahName,
            translationSurahName,
        } = this.props;

        return (
            <div className="result-box" onClick={this.openResultModal}>
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
    openResultModal: PropTypes.func.isRequired,
};
