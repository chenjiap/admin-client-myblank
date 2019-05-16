

import jsonp from 'jsonp'


import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

export const reqWeather = (city) => {

	const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

	return new Promise((resolve,reject) => {

    jsonp(
    	url,
			(err,data) => {
    		console.log(data)
    		if(!err && data.status === 'success'){
    		const {dayPictureUrl,weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl,weather})
				}else{
    			console.log('获取天气失败')
				}
			}
		)





	})





}






