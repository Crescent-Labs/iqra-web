import React, { Component } from 'react';
import Header from './Header.jsx';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: React.PropTypes.object,
};
