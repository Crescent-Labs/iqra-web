import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="not-found-page">
                    <img src="/static/img/logo-green.png" alt="logo" className="logo-image" />
                    <p className="content">Sorry, this page could not be found.</p>
                    <div className="button-container">
                        <a className="button" href="/">Return home</a>
                        <Link className="button" to="/app/search">Perform a search</Link>
                    </div>
                </div>
            </div>
        );
    }
}

NotFound.propTypes = {};
