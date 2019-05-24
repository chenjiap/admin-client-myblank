import React, {Component} from 'react';
import { Modal } from 'antd'

import {withRouter} from 'react-router-dom'


import {connect} from 'react-redux'

import './index.less'
import LinkButton from '../link-button'

import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'

import {logout} from '../../redux/actions'

import menuList from '../../config/menuConfig'

 class Header extends Component {
  state = {
    getTime:formateDate(Date.now()),
		dayPictureUrl:'',
    weather:''
  }

  getWeather = async() => {
    const {dayPictureUrl,weather} =await reqWeather('北京')
    this.setState({
			dayPictureUrl,
      weather
    })
  }


  getTime = () => {
		this.intervalId = setInterval(() => {
    this.setState(
      {
				getTime:formateDate(Date.now())
      }
    )

    },1000)
  }


  getTitle = (path) => {
    let title
     menuList.forEach(cItem => {
			if(cItem.key === path){
				title = cItem.title
      }else if(cItem.children){
				const cItemObj = cItem.children.find( a=> path.indexOf(a.key) === 0)
        if(cItemObj){
				  title = cItemObj.title
        }


      }


    })
		return title

  }



	unLog = () => {
    Modal.confirm(
			{
				title: '确认要退出吗?',
				onOk: () => {
					this.props.logout()
				},
				onCancel() {},
			}
    )



  }

  componentDidMount(){
    this.getTime()
    this.getWeather()

  }



  componentWillUnmount(){
    clearInterval(this.intervalId)

  }



  render () {

			const {getTime,dayPictureUrl, weather} = this.state
    const user =  this.props.user
   const path = this.props.location.pathname

		//const title = this.getTitle(path)

		const title = this.props.headTitle

    return <div className="header">
           <div className="header-top">
             <span>欢迎, {user.username}</span>
             <LinkButton onClick={this.unLog}>退出</LinkButton>
           </div>
           <div className="header-bottom">
             <div className="header-bottom-left">{title}</div>
             <div className="header-bottom-right">
               <span>{getTime}</span>
               <img src={dayPictureUrl} alt="weather"/>
               <span>{weather}</span>
             </div>
           </div>
    </div>
      
    
  }
}

export default connect(
	state => ({headTitle: state.headTitle,user: state.user}),
	{logout}
)(withRouter(Header))