import {INCERMENT,DECREMENT} from './action-types'

export const increment = number => ({type:INCERMENT,data:number})

export const decrement = number => ({type:DECREMENT,data:number})