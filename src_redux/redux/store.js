import {createStore,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

import count from './reducer'

export default createStore(count, composeWithDevTools(applyMiddleware(thunk)))