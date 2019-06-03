
export function createStore(reducer) {

	let state = reducer(undefined,{type:'@@redux/init'})

	const listeners = []

	function getState() {
		return state
	}
	
	function dispatch(action) {
		const newState = reducer(state,action)
		state = newState

		listeners.forEach(listener => listener())



	}
	
	
	function subscribe(listener) {
		listeners.push(listener)
	}



	return {
		getState,
		dispatch,
		subscribe

	}



}

/*
 整合传入参数对象中的多个reducer函数, 返回一个新的reducer
 新的reducer管理的总状态: {r1: state1, r2: state2}
 reducers的结构:
 {
 count: (state=2, action) => 3 ,
 user: (state={}, action) => {}
 }
 得到的总状态的结构
 {
 count: count(state.count, action),
 user: user(state.user, action)
 }
 */
export function combineReducers(reducers) {

	return (state={},action) => {

		const totalState = {}
		Object.keys(reducers).forEach(key => {
			totalState[key] = reducers[key](state[key],action)
		})

		return totalState


	}





}


export function combinReducers2(reducers) {

	return (state={},action) => {

		return Object.keys(reducers).reduce((totalState,key) =>{
			totalState[key] = reducers[key](state[key],action)

			return  totalState


		},{})

	}

}
















