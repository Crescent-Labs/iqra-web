import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import React from 'react';
import { render } from 'react-dom';

import Main from './components/Main.jsx';
import mainReducer from './reducers/mainReducer';

require('./stylesheets/main.scss');

const loggerMiddleware = createLogger();
const store = createStore(
    mainReducer,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/app" component={Main} />
        </Router>
    </Provider>
), document.getElementById('content'));
