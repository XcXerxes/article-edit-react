import React, { Component } from 'react'
import { Form, Select, Input, Button,message} from 'antd'
import ReactQuill from 'react-quill'
import PropTypes from 'prop-types'
const FormItem = Form.Item
const Option = Select.Option;
class IForm extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    hasFeedback: PropTypes.bool,
    className: PropTypes.string,
    getFieldDecorator: PropTypes.func,
  };
  constructor(args) {
    super(args)
    this.state = {
      editorHtml: ''
    }
  }
  // 提交
  handleSubmit = (e) =>{
    e.preventDefault();
    if(this.validateContent(this.state.editorHtml)){
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.props.issueSubmit(Object.assign({},values,{
            content: this.state.editorHtml
          }))
        }
      });
    }
  }
 
  validateContent(editorHtml){
    if(!editorHtml){
      message.error('内容不能为空')
      return false
    }
    return true
  }
  
  handleChange = (html) => {
    this.setState({ editorHtml: html })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const {labelList} = this.props
    const options = labelList.map( (item)=>(
      <Option key={item.uuid} >{item.name}</Option>
    ))

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ]
    }
    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video', 'color', 'background'
    ]

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="所属栏目"
          {...formItemLayout}
        >
          {getFieldDecorator('label', {
            rules: [{
              required: true, message: '不能为空'
            }]
          })(
            <Select >
              {options}
            </Select>
            )}
        </FormItem>
        <FormItem
          label="文章标题"
          {...formItemLayout}
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '标题不能为空'
            }]
          })(
            <Input />
            )}
        </FormItem>
        <FormItem
          label="文章内容"
          {...formItemLayout}
        >
         <ReactQuill
              theme={'snow'}
              onChange={this.handleChange}
              value={this.state.editorHtml}
              modules={modules}
              formats={formats}
              placeholder={this.props.placeholder}
            />
        </FormItem>
        <FormItem label="action" {...formItemLayout}>
          <div className="issue-form__btnGroup">
            <Button size="large" type="primary" htmlType="submit" className="issue-form__okBtn">
              确认
            </Button>
            <Button size="large" onClick={()=>this.props.cancel()} >
              取消
            </Button>
          </div>
        </FormItem>
      </Form>
    )
  }
}

const IssueForm = Form.create()(IForm)

export default IssueForm