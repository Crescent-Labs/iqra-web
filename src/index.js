import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import React from 'react';
import { render } from 'react-dom';

import Main from './components/Main.jsx';
import Contributors from './components/Contributors.jsx';
import Contact from './components/Contact.jsx';
import Thanks from './components/Thanks.jsx';
import RecordingContainer from './containers/RecordingContainer.jsx';
import ResultListContainer from './containers/ResultListContainer.jsx';
import mainReducer from './reducers/mainReducer';

require('./stylesheets/main.scss');

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
}

const store = createStore(
    mainReducer,
    applyMiddleware(...middlewares)
);

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/app" component={Main}>
                <IndexRedirect to="/app/search" />
                <Route path="/app/search" component={RecordingContainer} />
                <Route path="/app/results" component={ResultListContainer} />
            </Route>
            <Route path="/contributors" component={Contributors} />
            <Route path="/contact" component={Contact} />
            <Route path="/thanks" component={Thanks} />
        </Router>
    </Provider>
), document.getElementById('content'));
