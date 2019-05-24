import React, {Component} from 'react';

import {Menu, Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

import {setHeadTitle} from '../../redux/actions'

import logo from '../../assets/images/logo.png'
import './index.less'

import menuList from '../../config/menuConfig'



const SubMenu = Menu.SubMenu

 class LeftNav extends Component {

	 hasAuth = (item) => {
		 const {key, isPublic} = item
		 const menus = this.props.user.role.menus
		 const username = this.props.user.username

		 if(username==='admin' || isPublic || menus.indexOf(key)!==-1) {
			 return true
		 } else if(item.children){
			 return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
		 }

		 return false




	 }



	getMenuNodes = (menuList) => {

		// 得到当前请求的path
		const path = this.props.location.pathname
		return menuList.map(item => {
			if(this.hasAuth(item)){
				if(!item.children) {
					if (item.key===path || path.indexOf(item.key)===0) {
						// 更新redux中的headerTitle状态
						this.props.setHeadTitle(item.title)
					}

					return (
						<Menu.Item key={item.key} >
							<Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
								<Icon type={item.icon}/>
								<span>{item.title}</span>
							</Link>
						</Menu.Item>
					)
				} else {

					const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
					// 如果存在, 说明当前item的子列表需要打开
					if (cItem) {
						this.openKey = item.key
					}
					return (
						<SubMenu
							key={item.key}
							title={
								<span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
							}
						>
							{this.getMenuNodes(item.children)}
						</SubMenu>
					)
				}
			}
		})
	}



	 componentWillMount () {
		 this.menuNodes = this.getMenuNodes(menuList)
	 }




	render () {
		let path = this.props.location.pathname
		if(path.indexOf('/product')===0) {
			path = '/product'
		}

		const openKey = this.openKey

    return  <div className="left-nav">
      <Link to='/home' className='logo-link'>
        <img src={logo} alt="logo"/>
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[openKey]}
        mode="inline"
        theme="dark"
      >
				{
					this.menuNodes
				}

      </Menu>

    </div>



	}
}

export default connect(
	state => ({user: state.user}),
	{setHeadTitle}
)(withRouter(LeftNav))