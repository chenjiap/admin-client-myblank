import {INCERMENT,DECREMENT} from './action-types'

export const increment = number => ({type:INCERMENT,data:number})

export const decrement = number => ({type:DECREMENT,data:number})


export const incrementAsync = number => {
	return dispatch => {
		// 1. 执行异步(定时器, ajax请求, promise)
		setTimeout(() => {
			// 2. 当前异步任务执行完成时, 分发一个同步action
			dispatch(increment(number))
		}, 1000)
	}
}