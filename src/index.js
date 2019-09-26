import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Components/App/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import combineReducers from './store/reducers/index';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11'; 


const store = createStore(combineReducers, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
