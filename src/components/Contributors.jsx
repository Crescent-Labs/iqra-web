import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header.jsx';

export default class Contributors extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="contributors">
                    <h4>Contributors</h4>
                    <p className="contrib-description">Iqra is entirely developed and
                    maintained by a dedicated team of volunteers for the sake of the Ummah.
                    This project would not be where it is without their selfless
                    contributions. They are listed below:</p>
                    <h5>Development</h5>
                    <ul>
                        <li>Baraa Hamodi</li>
                    </ul>
                    <h5>Design</h5>
                    <ul>
                        <li>Thamjeeth Abdul Gaffoor</li>
                    </ul>
                    <h5>Logo</h5>
                    <ul>
                        <li>Razan Qaoud</li>
                    </ul>
                    <h5>Translation</h5>
                    <ul>
                        <li>Mohammed Fahad</li>
                        <li>Marwan Tarek</li>
                    </ul>
                    <p className="get-involved">
                        If you would like to contribute to this project, <Link to="/contact">
                            send us a message
                        </Link> or <a target="_blank" href="https://github.com/Crescent-Labs">
                            check us out on Github
                        </a>.
                    </p>
                </div>
            </div>
        );
    }
}
