import React, {Component} from 'react';

import {Redirect,Route,Switch} from 'react-router-dom'

import {Layout} from 'antd'

import {connect} from 'react-redux'
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



const {Footer, Sider, Content} = Layout

 class Admin extends Component {


  render () {
		const user = this.props.user
		if (!user || !user._id) {
			// 跳转
			// this.props.history.replace('/login')  // 常用在事件回调函数中
			return <Redirect to='/login'/>
// 渲染此组件标签的效果: 自动跳转到指定的路由  (常用在render()中)
		}

		return <Layout style={{minHeight: '100%'}}>
			<Sider>
				<LeftNav/>
			</Sider>
			<Layout>
				<Header></Header>
				<Content style={{backgroundColor: '#fff',margin:20}}>
					<Switch>
						<Route path='/home' component={Home}/>
						<Route path='/category' component={Category}/>
						<Route path='/product' component={Product}/>
						<Route path='/role' component={Role}/>
						<Route path='/user' component={User}/>
						<Route path='/charts/bar' component={Bar}/>
						<Route path='/charts/line' component={Line}/>
						<Route path='/charts/pie' component={Pie}/>
						<Redirect to='/home'/>

					</Switch>
				</Content>
				<Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
			</Layout>
		</Layout>
      
    
  }
}

export default connect(
	state => ({user: state.user}),
	{}
)(Admin)