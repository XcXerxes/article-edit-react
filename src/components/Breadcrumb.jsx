import React from 'react'
import {Breadcrumb} from 'antd'

const ArticleBread = (props) => (
  <Breadcrumb style={{ margin: '12px 0' }}>
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
  </Breadcrumb>
)

export default ArticleBread