import React, { Component } from 'react';
import Header from './Header.jsx';

export default class Thanks extends Component {
    render() {
        return (
            <div>
                <Header />
                <p className="contact-thanks">Thanks for getting in touch!</p>
            </div>
        );
    }
}
