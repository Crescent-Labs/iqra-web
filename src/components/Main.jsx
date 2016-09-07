import React, { Component } from 'react';
import Header from './Header.jsx';
import ResultModalContainer from '../containers/ResultModalContainer.jsx';

export default class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <ResultModalContainer />
            </div>
        );
    }
}

Main.propTypes = {
    children: React.PropTypes.object,
};
