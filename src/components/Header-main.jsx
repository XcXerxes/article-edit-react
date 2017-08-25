import React from 'react'
import {Layout,Icon} from 'antd'
const {Header} = Layout

const HeaderMain = (props)=>{
  return (
    <Header className="header article-header">
    <div className="header-logo">
      <img src={require("../assets/images/logo_top.png")} alt=""/>
    </div>
    <div className="header-userInfo">
      <div className="header-userInfo__headImg">
        <img src={props.userhead ||require('../assets/images/icon72.png')} alt=""/>
        <span>{props.username||'admin'}</span>
      </div>
      <div className="header-userInfo__logout">
        <a onClick={()=>props.linkToIndex()}>
          <Icon type="poweroff" />退出系统
        </a>
      </div>
    </div>
  </Header>
  )
}

export default HeaderMain