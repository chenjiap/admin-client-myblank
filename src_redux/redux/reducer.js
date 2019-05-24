import {INCERMENT,DECREMENT} from './action-types'

import {combineReducers} from 'redux'

function count(state=1, action) {
	console.log('count()', state, action)
	switch (action.type) {
		case INCERMENT:
			return state + action.data
		case DECREMENT:
			return state - action.data
		default:
			return state
	}

}

const initUser = {}
function user(state = initUser, action) {
	switch (action.type) {
		default:
			return state
	}
}

export default combineReducers({
	count,
	user
})



















