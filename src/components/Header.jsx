import React from 'react';

const Header = () => (
    <nav>
        <div className="header">
            <a href="/" className="logo-container">
                <img src="/static/img/logo.png" className="logo" alt="logo" />
            </a>
            <a href="#" data-activates="mobile" className="dropdown button-collapse">
                <i className="material-icons">menu</i>
                <ul className="mobile-nav" id="mobile">
                    <li><a href="/">Home</a></li>
                    <li><a href="/app">Search</a></li>
                </ul>
            </a>
            <ul className="desktop-nav hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/app">Search</a></li>
            </ul>
        </div>
    </nav>
);

export default Header;
