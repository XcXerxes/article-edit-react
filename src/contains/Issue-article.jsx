import React,{Component} from 'react'
import IssueForm from '../components/Issue/Issue-form'
import PropTypes from 'prop-types'
import ArticleBread from '../components/Breadcrumb'
import {reLoginToIndex} from '../utils'
import api from '../Api'
import {Layout,message} from 'antd'

const {Content} = Layout
export default class IssueArticle extends Component{
  static propTypes = {
    formSubmit:PropTypes.func,
    className:PropTypes.string
  };
  constructor(args){
    super(args)
    this.state = {
      labelList:[]
    }
  }

  // 确认提交
  formSubmit = (info)=>{
    console.log(info)
    this.createArticle(info)
  }
  // 取消
  cancel = ()=>{
    const {history} = this.props
    history.push('/article')
  }

  // 创建文章
  createArticle({title,label,content}){
    const {history} = this.props
    api.createArticle({title,label,content}).then(data =>{
      if(data.code ==='1'){
        message.success('发布成功，请等待审核....')
        history.push('/article')
      }else if(data.code ==='2'){
        reLoginToIndex(message, history)
      }else {
        message.error(data.des)
      }
    }).catch( err=>{
      message.error(err)
    })
  }

  // 获取文章的分类标题
  fetchData(){
    api.getArticleLabelList().then(data =>{
      if(data.code === '1'){
        this.setState({labelList: data.data})
      }else if(data.code === '2'){
        reLoginToIndex(message, this.props.history)
      }else {
        message.error(data.des)
      }
    }).catch(err =>{
      message.error(err)
    })
  }


  componentDidMount(){
    this.fetchData()
  }

  render(){
    return(
      <Layout className="App">
        <Layout style={{ padding: '0 24px 24px' }}>
          <ArticleBread title="发布文章" />
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <IssueForm 
              issueSubmit={this.formSubmit} cancel={this.cancel}
              labelList={this.state.labelList}
              >
            </IssueForm>
          </Content>
        </Layout>
      </Layout>
    )
  }
}