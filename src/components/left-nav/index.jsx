import React, {Component} from 'react';

import {Menu, Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './index.less'

import menuList from '../../config/menuConfig'


const SubMenu = Menu.SubMenu

 class LeftNav extends Component {

	getMenuNodes = (menuList) => {

		// 得到当前请求的path
		const path = this.props.location.pathname
		return menuList.map(item => {
			if(!item.children) {
				return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
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

export default withRouter(LeftNav)