

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

export const reqCategorys = (parentId = '0') => ajax('/manage/category/list', {parentId})

export const reqAddCategory = (categoryName,parentId ) => ajax('/manage/category/add', {
	categoryName,
	parentId

}, 'POST')


export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')


export const reqProducts = (pageNum, pageSize) => ajax( '/manage/product/list', {pageNum, pageSize})


//分类categoryId得到所属于哪一类的类名
export const reqCategory = (categoryId) => ajax( '/manage/category/info', {categoryId})


export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax( '/manage/product/search', {
	pageNum,
	pageSize,
	[searchType]: searchName,
})


export const reqUpdateStatus = (productId, status) => ajax( '/manage/product/updateStatus', {productId, status}, 'POST')


export const reqDeleteImg = (name) => ajax( '/manage/img/delete', {name}, 'POST')



export const reqAddOrUpdateProduct = (product) => ajax( '/manage/product/' + ( product._id?'update':'add'), product, 'POST')

export const reqRoles = () => ajax('/manage/role/list')


export const reqAddRole = (roleName) => ajax( '/manage/role/add', {roleName}, 'POST')

export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')

export const reqUsers = () => ajax('/manage/user/list')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')


export const reqDeleteUser = (userId) => ajax( '/manage/user/delete', {userId}, 'POST')


export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')