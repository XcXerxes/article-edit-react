import React, { Component } from 'react'
import { Layout, message, Modal } from 'antd'
import ArticleBread from '../components/Breadcrumb'
import PropTypes from 'prop-types'
import { reLoginToIndex } from '../utils'
import api from '../Api'

const { Content } = Layout;
const confirm = Modal.confirm;

import ArticleTabel from '../components/Article/Article-table'
export default class Articles extends Component {
  static propTypes = {
    handleTablechange: PropTypes.func,
    className: PropTypes.string
  };

  constructor(args) {
    super(args)
    this.state = {
      dataSource: [],
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '15']
      },
      loading: false
    }
  }

  // 获取文章列表
  fetchData(pageIndex, pageSize) {
    this.setState({
      loading: true
    })
    api.getArticleList({
      pageIndex,
      pageSize
    }).then(data => {
      const pagination = { ...this.state.pagination }
      pagination.total = data.totalCount
      if (data.code === '1') {
        this.setState({
          pagination,
          dataSource: data.data,
          loading: false
        })
      } else if (data.code === '2') {
        reLoginToIndex(message, this.props.history)
      } else {
        message.error(data.des)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // 分页变化
  handleTablechange = (pagination) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize
    this.setState({
      pagination: pager
    })
    this.fetchData((pagination.current - 1) * pagination.pageSize, pagination.pageSize)
  }


  // 删除当前行文章
  deleteArticle(id,current) {
    const self = this
    confirm({
      title: '确认要删除当前行文章吗？',
      onOk() {
        api.deleteArticleById({ id }).then(data => {
          if (data.code === '1') {
            message.success('删除成功')
            const {pagination } = self.state
            let pageIndex = (current-1)*pagination.pageSize
            pageIndex = pageIndex <0 ? 0 :pageIndex
            self.fetchData(pageIndex, pagination.pageSize)
          } else if (data.code === "2") {
            reLoginToIndex(message, this.props.history)
          } else {
            message.error(data.des)
          }
        }).catch(err => {
          message.error(err)
        })
      }
    })
  }
  componentDidMount() {
    this.fetchData(0, 5)
  }

  render() {
    const { dataSource, pagination, loading } = this.state
    return (
      <Layout style={{ padding: '0 24px 24px' }}>
        <ArticleBread title="文章列表" />
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <ArticleTabel
            dataSource={dataSource}
            pagination={pagination}
            loading={loading}
            tableChange={this.handleTablechange}
            deleteArticle={this.deleteArticle.bind(this)}
            current={this.state.pagination.current}
          />
        </Content>
      </Layout>
    )
  }
}