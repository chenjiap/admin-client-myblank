
import React, {Component} from 'react';

import { Card ,Table,Button,Icon, message,Modal} from 'antd'


import LinkButton from '../../components/link-button/index'
import {reqCategorys,reqUpdateCategory, reqAddCategory} from '../../api'


import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {
	state = {
		parentId: '0',
		categorys: [],
		subCategorys: [],
		parentName: '',
		showStatus: 0,
		loading: false

  }

	showSubCategorys = (category) => {

		this.setState({
			parentId: category._id,
			parentName: category.name
		},() => {
			this.getCategorys()
    })

  }

	initColumns = () => {
		this.columns = [
			{
				title: '分类的名称',
				dataIndex: 'name', // 显示数据对应的属性名
			},
			{
				title: '操作',
				width: 300,
				render: (category) => ( // 返回需要显示的界面标签
          <span>
             <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
						{this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}

          </span>
				)
			}
		]

	}


	showCategorys = () => {
		this.setState({
			parentId: '0',
			parentName: '',
			subCategorys: []
		})
	}

	showUpdate = (category) => {
		// 保存分类对象
		this.category = category
		// 更新状态
		this.setState({
			showStatus: 2
		})
	}




	showAdd = () => {
		this.setState({
			showStatus: 1
		})
	}

	handleCancel = () => {
	  console.log(this.form)
		this.form.resetFields()
		// 隐藏确认框
		this.setState({
			showStatus: 0
		})
	}

	getCategorys = async (parentId) => {
		this.setState({loading: true})
	   parentId = parentId || this.state.parentId
		const result = await reqCategorys(parentId)
		this.setState({loading: false})
		if(result.status===0) {
			const categorys = result.data
			if(parentId==='0') {
				this.setState({
					categorys
				})
			} else {
				this.setState({
					subCategorys: categorys
				})
			}
		} else {
			message.error('获取分类列表失败')
		}

  }

	updateCategory = async () => {
		this.form.validateFields(async (err, values) => {

		  if(!err){
				this.setState({
					showStatus: 0
				})

				const categoryId = this.category._id
				const {categoryName} = values
				this.form.resetFields()

				const result = await reqUpdateCategory({categoryId, categoryName})
				if (result.status===0) {
					// 3. 重新显示列表
					this.getCategorys()
				}




			}
    })


  }

	addCategory = () => {
		this.form.validateFields(async (err, values) => {
		  if(!err){
				this.setState({
					showStatus: 0
				})
				const {parentId, categoryName} = values
				this.form.resetFields()
				const result = await reqAddCategory(categoryName, parentId)
				if(result.status===0) {
					if(parentId===this.state.parentId) {
						this.getCategorys()
					} else if (parentId==='0'){
						this.getCategorys('0')
					}



        }






      }



    })

  }



	componentWillMount () {
		this.initColumns()
	}
	componentDidMount () {
		this.getCategorys()
	}



	render () {

		/*const dataSource = [
			{
				key: '1',
				name: 'Mike',
				age: 32,
				address: '10 Downing Street',
			},
			{
				key: '2',
				name: 'John',
				age: 42,
				address: '10 Downing Street',
			},
		];

		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
			},
		];
*/

		const {categorys,subCategorys,parentId,parentName,showStatus,loading} = this.state

		const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        添加
      </Button>
		)
		const category = this.category || {}

		const title = parentId === '0' ? '一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight: 5}}/>
        <span>{parentName}</span>
      </span>
		)


		return  <Card title={title} extra={extra}>
      <Table
        dataSource={parentId==='0' ? categorys : subCategorys}
        columns={this.columns}
        rowKey='_id'
        bordered
        loading={loading}
        pagination={{showSizeChanger:true,defaultPageSize:10,showQuickJumper:true,}}

      />
      <Modal
        title="添加分类"
        visible={showStatus===1}
        onOk={this.addCategory}
        onCancel={this.handleCancel}
      >
        <AddForm
          setForm={(form) => {this.form = form}}
          categorys={categorys}
          parentId={parentId}
        />
      </Modal>
        <Modal
          title="更新分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            setForm={(form) => {this.form = form}}
          />
        </Modal>

    </Card>
      
    
  }
}

