import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import _ from 'lodash'

const REDUCERS = {
    'READ_QUESTIONNAIRES': (state, action) => ({ ...state, questionnaires: action.data }),
    'CREATE_QUESTIONNAIRES': (state, action) => ({ ...state, questionnaires: [...state.questionnaires, action.data ] }),
    'UPDATE_QUESTIONNAIRES': (state, action) => ({ ...state, questionnaires: _.map(state.questionnaires, q => q.id === action.data.id ? action.data : q) }),
    'DELETE_QUESTIONNAIRES': (state, action) => ({ ...state, questionnaires: _.reject(state.questionnaires, { id: action.data }) }),
    'LOADING': (state, action) => ({ ...state, loading: action.data }),
    'MESSAGE': (state, action) => ({ ...state, message: action.data }),
    'ERROR': (state, action) => ({ ...state, error: action.data }),
    'CONFIG': (state, action) => ({ ...state, config: action.data })
}

const reducer = (state, action) => _.get(REDUCERS, action.type, _.identity)(state, action)

const initialState = {
    config: null,
    error: false,
    message: '',
    questionnaires: [],
    loading: false
}

const store = createStore(reducer, initialState, applyMiddleware(thunk))

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
