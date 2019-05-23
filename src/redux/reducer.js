import {INCERMENT,DECREMENT} from './action-types'

export default function count(state=1,action) {
    switch(action.type){
			case INCERMENT :
				return state+action.data
			case DECREMENT :
				
				return state-action.data
			default :
				return state

		}

}