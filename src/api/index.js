

import jsonp from 'jsonp'


import ajax from './ajax'

const BASE = ''

export const reqLogin = (username, password) => ajax(BASE +'/login', {username, password}, 'POST')

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

export const reqCategorys = (parentId = '0') => ajax(BASE +'/manage/category/list', {parentId})

export const reqAddCategory = (categoryName,parentId ) => ajax(BASE +'/manage/category/add', {
	categoryName,
	parentId

}, 'POST')


export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE +'/manage/category/update', {categoryId, categoryName}, 'POST')


export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})


//分类categoryId得到所属于哪一类的类名
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})


export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
	pageNum,
	pageSize,
	[searchType]: searchName,
})


export const reqUpdateStatus = (productId, status) => ajax( BASE +'/manage/product/updateStatus', {productId, status}, 'POST')


export const reqDeleteImg = (name) => ajax( BASE +'/manage/img/delete', {name}, 'POST')



export const reqAddOrUpdateProduct = (product) => ajax( BASE +'/manage/product/' + ( product._id?'update':'add'), product, 'POST')

export const reqRoles = () => ajax(BASE +'/manage/role/list')


export const reqAddRole = (roleName) => ajax( BASE +'/manage/role/add', {roleName}, 'POST')

export const reqUpdateRole = (role) => ajax(BASE +'/manage/role/update', role, 'POST')

export const reqUsers = () => ajax(BASE +'/manage/user/list')

export const reqAddUser = (user) => ajax(BASE +'/manage/user/add', user, 'POST')


export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {userId}, 'POST')


export const reqAddOrUpdateUser = (user) => ajax(BASE +'/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')