import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

// creates the 'store' that will be used to hold our application state
// takes three arguments: a reducer, the starting state, and a call
// of applyMiddleware() containing a list of middleware being used
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// initial rendering of our App (which contains all of our components) onto
// the DOM of index.html (located up in the public folder)
// We wrap the App component in a Provider, which lets us attach the Redux
// store to our application
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
