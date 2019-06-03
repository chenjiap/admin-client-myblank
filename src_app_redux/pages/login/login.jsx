
import React, {Component} from 'react'

import {
	Form,
	Input,
	Icon,
	Button,
	message
} from 'antd'

import {Redirect} from 'react-router-dom'

import './login.less'


import {connect} from 'react-redux'

import {login} from '../../redux/actions'

import logo from '../../assets/images/logo.png'

 class Login extends Component {

    handleSubmit = (event) => {
      event.preventDefault()
			// 对所有表单字段进行检验
			this.props.form.validateFields(async (err, values) => {
				if (!err) {
					// 校验成功
					const {username, password} = values
					this.props.login(username, password)

				} else {
          console.log('正则校验失败校验')

				}
			})

		}

	 validator = (rule, value, callback) => {
		 // console.log(rule, value)
		 const length = value && value.length
		 const pwdReg = /^[a-zA-Z0-9_]+$/
		 if (!value) {
			 // callback如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
			 callback('必须输入密码')
		 } else if (length < 4) {
			 callback('密码必须大于4位')
		 } else if (length > 12) {
			 callback('密码必须小于12位')
		 } else if (!pwdReg.test(value)) {
			 callback('密码必须是英文、数组或下划线组成')
		 } else {
			 callback() // 必须调用callback
		 }
	 }




	 render () {
		 const user = this.props.user
		 if( user && user._id) {
			 return <Redirect to='/home'/>
		 }

		 const errorMsg = this.props.user.errorMsg
		 console.log(errorMsg)

		 const {getFieldDecorator} = this.props.form

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
				<div className={errorMsg ? 'error-msg show' : 'error-msg'}>{errorMsg}</div>
        <h2>用户登陆</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
						{getFieldDecorator('username', {
							rules: [
							  { required: true, whitespace:true,message: '必须输入用户名' },
                {min:4,message:'用户名必须大于4位'},
                {max:12,message:'用户名必须小于12位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}
              ],
						})(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
						)}
          </Form.Item>
          <Form.Item>
						{
							getFieldDecorator('password', {
								rules: [
									// 自定义表单校验规则
									{validator: this.validator}
								]
							})(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="密码"/>
							)
						}

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>

      </section>
    </div>
      
    
  }
}

export default connect(
	state => ({user: state.user}),
	{login}
)( Form.create()(Login))
