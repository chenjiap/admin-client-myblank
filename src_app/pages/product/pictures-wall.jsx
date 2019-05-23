import React, {Component} from 'react';

import PropTypes from 'prop-types'

import { Upload, Icon, Modal, message } from 'antd'

import {BASE_IMG_URL} from "../../utils/constants"

import {reqDeleteImg} from '../../api'

export default class PicturesWall extends Component {
	static propTypes = {
		imgs: PropTypes.array
	}


	constructor (props) {
		super(props)

		let fileList = []

		const {imgs} = this.props
		if (imgs && imgs.length>0) {
			fileList = imgs.map((img, index) => ({
				uid: -index,
				name: img,
				status: 'done',
				url: BASE_IMG_URL + img
			}))
		}

		// 初始化状态
		this.state = {
			previewVisible: false, // 标识是否显示大图预览Modal
			previewImage: '', // 大图的url
			fileList // 所有已上传图片的数组
		}
	}

	getImgs  = () => {
		return this.state.fileList.map(file => file.name)
	}


	handlePreview = file => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	};
	handleCancel = () => this.setState({ previewVisible: false })

	handleChange = async ({ file, fileList }) => {
		if(file.status==='done') {
			const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
			if(result.status===0) {
				message.success('上传图片成功!')
				const {name, url} = result.data
				file = fileList[fileList.length-1]
				file.name = name
				file.url = url
			} else {
				message.error('上传图片失败')
			}
		} else if (file.status==='removed') { // 删除图片
			const result = await reqDeleteImg(file.name)
			if (result.status===0) {
				message.success('删除图片成功!')
			} else {
				message.error('删除图片失败!')
			}
		}
		this.setState({ fileList })
	}

	/*state = {
		previewVisible: false, // 标识是否显示大图预览Modal
		previewImage: '', // 大图的url
		fileList: [
			{
			 uid: '-1', // 每个file都有自己唯一的id
			 name: 'xxx.png', // 图片文件名
			 status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
			 url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
			 },
		],
	}*/



  render () {
		const { previewVisible, previewImage, fileList } = this.state
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div>Upload</div>
			</div>
		)

    return  <div>
			<Upload
				action="/manage/img/upload"
				accept='image/*'
				name='image'
				listType="picture-card"
				fileList={fileList}
				onPreview={this.handlePreview}
				onChange={this.handleChange}
			>
				{fileList.length >= 3 ? null : uploadButton}
			</Upload>

			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</div>
      
    
  }
}

