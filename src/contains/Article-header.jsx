import React, { Component } from 'react'
import HeaderMain from '../components/Header-main'
import PropTypes from 'prop-types'

export default class ArticleHeader extends Component {
  static propTypes = {
    className: PropTypes.string,
    getUserInfo: PropTypes.func
  };
  constructor(args) {
    super(args)
    this.state = {
      userInfo: {}
    }
  }
  // 获取用户的信息
  getUserInfo(){
    const username = localStorage.getItem('username')||''
    const userhead = localStorage.getItem('userhead')||''
    this.setState({
      userInfo:{
        username,
        userhead
      }
    })
  }
 linkToIndex = ()=>{
   localStorage.clear()
   this.props.history.replace('/')
 }
 componentWillReceiveProps(props,nextProps){
   this.getUserInfo()
 }

  componentDidMount(){
    
  }

  render(){
    const newProps = Object.assign({},this.state.userInfo,{
      linkToIndex:this.linkToIndex
    })
    return (
      <HeaderMain {...newProps} />
    )
  }

}