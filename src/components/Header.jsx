import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
    componentDidMount() {
        $('.button-collapse').sideNav({
            edge: 'right',
            closeOnClick: true,
        });
    }

    render() {
        return (
            <nav>
                <div className="header">
                    <a href="/" className="logo-container">
                        <img src="/static/img/logo.png" className="logo" alt="logo" />
                    </a>
                    <ul className="right desktop-nav hide-on-med-and-down">
                        <li><a href="/">Home</a></li>
                        <li><Link to="/app/search">Search</Link></li>
                    </ul>
                    <ul className="side-nav" id="mobile">
                        <li><a href="/">Home</a></li>
                        <li><Link to="/app">Search</Link></li>
                    </ul>
                    <a href="#" data-activates="mobile" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>
                </div>
            </nav>
        );
    }
}
