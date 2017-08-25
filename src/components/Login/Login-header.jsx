import React from 'react'
import {Layout} from 'antd'
const {Header} = Layout

const LoginHeader = ()=>(
  <Header className="header">
    <img src={require("../../assets/images/logo_top.png")} alt="" style={{verticalAlign: 'text-bottom'}}/>
  </Header>
)

export default LoginHeader