import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="not-found-page">
                    <p>Sorry, this page couldn't be found.</p>
                    <Link to="/app/search">Perform a search</Link>
                </div>
            </div>
        );
    }
}

NotFound.propTypes = {};
