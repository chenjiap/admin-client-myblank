
import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

import storageUtils from './utils/storageUtils'
import  memoryUtil from './utils/memoryUtils'

const user = storageUtils.getUser()
if(user._id) { // 前面登陆过
	memoryUtil.user = user
}


ReactDOM.render(<App/>,document.getElementById('root'))
