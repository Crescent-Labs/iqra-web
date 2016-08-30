import React, { Component } from 'react';
import Header from './Header.jsx';
import RecordingContainer from '../containers/RecordingContainer.jsx';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <RecordingContainer />
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: React.PropTypes.object,
};
