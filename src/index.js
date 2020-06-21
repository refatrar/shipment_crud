import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'

import './index.css';
import Reducers from "./reducers/Reducers";
import App from './App';

require('dotenv').config()

const initialState = {};
const middleware = [thunk];
const store = createStore(
    Reducers,
    initialState,
    // applyMiddleware(...middleware),
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);