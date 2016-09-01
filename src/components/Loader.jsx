import React, { Component } from 'react';

export default class Loader extends Component {
    render() {
        return (
            <div className="loading-overlay">
                <div className="loader"></div>
            </div>
        );
    }
}
