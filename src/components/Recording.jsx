import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Loader from './Loader.jsx';

let recognition;
let ignoreOnEnd;
let audioContext;
let voiceLevelValues;

export default class Recording extends Component {
    constructor(props) {
        super(props);

        this.initializeRecognition = this.initializeRecognition.bind(this);
        this.onRecognitionStart = this.onRecognitionStart.bind(this);
        this.onRecognitionError = this.onRecognitionError.bind(this);
        this.onRecognitionEnd = this.onRecognitionEnd.bind(this);
        this.onRecognitionResult = this.onRecognitionResult.bind(this);
        this.upgradeRequired = this.upgradeRequired.bind(this);
    }

    componentDidMount() {
        if (!('webkitSpeechRecognition' in window)) {
            this.upgradeRequired();
        } else {
            this.initializeRecognition();
        }
        this.props.resetSearch();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.results.length === 0 && nextProps.results.length > 0) {
            browserHistory.push('/app/results');
        }
    }

    componentWillUnmount() {
        recognition.stop();
        audioContext.close();
    }

    onRecognitionStart() {
        if (this.props.recording) {
            // User pressing button to stop recording
            recognition.stop();
            return;
        }

        // User starting recording
        recognition.start();
        // The code below is executed but immediately replaced if recognition starts successfully
        // TODO: Change mic appearance to show that it's disabled.
        this.props.updateRecordMessage('Click the "Allow" button above to enable your microphone.');
    }

    onRecognitionError() {

    }

    onRecognitionEnd() {
        this.props.updateRecognizingState(false);
        if (ignoreOnEnd) {
            return;
        }
        if (!this.props.query) {
            this.props.updateRecordMessage(
                'Click on the microphone icon and begin speaking.'
            );
        }
    }

    onRecognitionResult(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                this.props.getSearchResults(this.props.query + event.results[i][0].transcript);
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        this.props.updatePartialQuery(interimTranscript);
        console.log('Final', this.props.query);
        console.log('Interim', interimTranscript);
    }

    onRecordMessageNeedsChange(message) {
        this.props.updateRecordMessage(message);
    }

    upgradeRequired() {
        this.props.upgradeRequired();
    }

    initializeRecognition() {
        const context = this;

        recognition = new webkitSpeechRecognition();
        recognition.lang = 'ar-AE';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            context.props.startRecording();
            context.refs.micImg.src = '/static/img/mic.svg';
            ignoreOnEnd = false;
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                context.refs.micImg.src = '/static/img/mic.svg';
                context.props.updateRecordMessage(
                    'No speech was detected. You may need to adjust your' +
                    '<a href="//support.google.com/chrome/bin/answer.py' +
                    '?hl=en&amp;answer=1407892">microphone settings</a>.'
                );
            } else if (event.error === 'audio-capture') {
                context.refs.micImg.src = '/static/img/mic.svg';
                context.props.updateRecordMessage(
                    'No microphone was found. Ensure that a microphone is installed and that ' +
                    '<a href="//support.google.com/chrome/bin/answer.py?' +
                    'hl=en&amp;answer=1407892">microphone settings</a> are configured correctly.'
                );
            } else if (event.error === 'not-allowed') {
                if (event.timeStamp - context.props.startRecognitionTime < 100) {
                    context.props.updateRecordMessage('Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream');
                } else {
                    context.props.updateRecordMessage('Permission to use microphone was denied.');
                }
            }
            ignoreOnEnd = true;
        };

        recognition.onend = () => {
            context.onRecognitionEnd();
        };

        recognition.onresult = (event) => {
            context.onRecognitionResult(event);
        };

        navigator.getUserMedia = navigator.getUserMedia ||
                                 navigator.webkitGetUserMedia ||
                                 navigator.mozGetUserMedia;
        audioContext = new AudioContext();
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true, video: false }, stream => {
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
                voiceLevelValues = [0, 0, 0];
                analyser.smoothingTimeConstant = 0.3;
                analyser.fftSize = 1024;
                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);
                javascriptNode.onaudioprocess = () => {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    let values = 0;
                    const length = array.length;
                    for (let i = 0; i < length; i++) {
                        values += array[i];
                    }
                    const rawAverage = values / length;
                    voiceLevelValues.shift();
                    voiceLevelValues.push(rawAverage);
                    const adjustedAverage =
                        (voiceLevelValues[0] + voiceLevelValues[1] + voiceLevelValues[2]) / 3;
                    const buttonWidth = `${75 + adjustedAverage * 1.8}px`;
                    if (context.props.recording) {
                        context.refs.mic_button.style.width = buttonWidth;
                        context.refs.mic_button.style.height = buttonWidth;
                    }
                };
            }, err => {
                console.log('The following error occurred: ', err.name);
            });
        }
    }

    render() {
        return (
            <div className="search-page">
                {this.props.canRecord &&
                    <div className="search-box">
                        <h2 className="record-message">
                            {this.props.recordMessage}
                        </h2>
                        <div className="search-button-container">
                            <button
                                className="search-button"
                                onClick={this.onRecognitionStart}
                                ref="mic_button"
                            />
                            <img ref="micImg" src="/static/img/mic.svg" alt="Start" />
                        </div>
                        <span className="query">{this.props.query}</span>
                        <span className="partial-query">{this.props.partialQuery}</span>
                    </div>
                }
                {!this.props.canRecord &&
                    <p className="info-upgrade">Thank you for trying to use Iqra.
                        Unfortunately, Iqra is not supported by this browser. Upgrade
                        to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.
                    </p>
                }
                {this.props.isLoading && <Loader />}
            </div>
        );
    }
}

Recording.propTypes = {
    canRecord: PropTypes.bool.isRequired,
    recording: PropTypes.bool.isRequired,
    recordMessage: PropTypes.string.isRequired,
    startRecognitionTime: PropTypes.number.isRequired,
    query: PropTypes.string.isRequired,
    partialQuery: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    startRecording: PropTypes.func.isRequired,
    updateRecordMessage: PropTypes.func.isRequired,
    updateRecognizingState: PropTypes.func.isRequired,
    getSearchResults: PropTypes.func.isRequired,
    updatePartialQuery: PropTypes.func.isRequired,
    upgradeRequired: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
};
