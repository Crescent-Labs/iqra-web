import React, { Component, PropTypes } from 'react';

let recognition;
let ignoreOnEnd;

export default class Recording extends Component {
    constructor(props) {
        super(props);

        this.initializeRecognition = this.initializeRecognition.bind(this);
        this.onRecognitionStart = this.onRecognitionStart.bind(this);
        this.onRecognitionError = this.onRecognitionError.bind(this);
        this.onRecognitionEnd = this.onRecognitionEnd.bind(this);
        this.onRecognitionResult = this.onRecognitionResult.bind(this);
        this.upgradeRequired = this.upgradeRequired.bind(this);

        if (!('webkitSpeechRecognition' in window)) {
            this.upgradeRequired();
        } else {
            this.initializeRecognition();
        }
    }

    onRecognitionStart() {
        if (this.props.recording) {
            console.log('stop recording');
            recognition.stop();
            return;
        }

        console.log('start recording');
        recognition.start();
        this.refs.micImg.src = '/static/img/mic-slash.gif';
        this.props.updateRecordMessage('Click the "Allow" button above to enable your microphone.');
    }

    onRecognitionError() {

    }

    onRecognitionEnd() {

    }

    onRecognitionResult(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                this.props.updateQuery(this.props.query + event.results[i][0].transcript);
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
            this.refs.micImg.src = '/static/img/mic-animate.gif';
            ignoreOnEnd = false;
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                this.refs.micImg.src = '/static/img/mic.gif';
                context.props.updateRecordMessage(
                    'No speech was detected. You may need to adjust your' +
                    '<a href="//support.google.com/chrome/bin/answer.py' +
                    '?hl=en&amp;answer=1407892">microphone settings</a>.'
                );
            } else if (event.error === 'audio-capture') {
                this.refs.micImg.src = '/static/img/mic.gif';
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
            context.props.updateRecognizingState(false);
            if (ignoreOnEnd) {
                return;
            }
            this.refs.micImg.src = '/static/img/mic.gif';
            if (!context.props.query) {
                context.props.updateRecordMessage(
                    'Click on the microphone icon and begin speaking.'
                );
                return;
            }
        };

        recognition.onresult = (event) => {
            context.onRecognitionResult(event);
        };
    }

    render() {
        return (
            <div>
                {this.props.canRecord &&
                    <div>
                        <h2 className="center" id="subheader">
                            Tap on the mic and recite a full or partial verse
                        </h2>
                        <div id="results">
                            <div className="center">
                                <button id="start_button" onClick={this.onRecognitionStart}>
                                    <img ref="micImg" src="/static/img/mic.gif" alt="Start" />
                                </button>
                            </div>
                            <span>{this.props.query}</span>
                            <span>{this.props.partialQuery}</span>
                        </div>
                    </div>
                }
                <div className="record-message">
                    {this.props.recordMessage}
                    {!this.props.canRecord &&
                        <p id="info_upgrade">Web Speech API is not supported by this browser.
                            Upgrade to <a href="//www.google.com/chrome">Chrome</a>
                            version 25 or later.
                        </p>
                    }
                </div>
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
    startRecording: PropTypes.func.isRequired,
    updateRecordMessage: PropTypes.func.isRequired,
    updateRecognizingState: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
    updatePartialQuery: PropTypes.func.isRequired,
    upgradeRequired: PropTypes.func.isRequired,
};
