import React, { Component } from 'react'
import ArticleBread from '../components/Breadcrumb'
import MobileView from '../components/Article/Article-detail'
import api from '../Api'
import PropTypes from 'prop-types'
import {reLoginToIndex} from '../utils'
import { Layout, message } from 'antd'

const { Content } = Layout


export default class ViewArticle extends Component {
    static propTypes = {
        fetchData: PropTypes.func,
        className: PropTypes.string
    };
    constructor(args) {
        super(args)
        this.state = {
            articleInfo: {}
        }
    }

    // 获取当前页的文章
    fetchData(uuid) {
        api.queryArticleByUUId(uuid).then(data => {
            if (data.code === '1') {
                this.setState({ articleInfo: data.data })
            } else if (data.code === '2') {
                reLoginToIndex(message,this.props.history)
            } else {
                message.error(data.des)
            }
        }).catch(err => {
            message.error(err)
        })
    }

    componentDidMount() {
        const { location } = this.props.history
        this.fetchData(location.pathname.substr(location.pathname.lastIndexOf('/') + 1))

    }
    render() {
        return (
            <Layout className="App">
                <div className="article-content">
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <ArticleBread title="预览文章" />
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <MobileView articleInfo={this.state.articleInfo}></MobileView>
                        </Content>
                    </Layout>
                </div>
            </Layout>
        )
    }
}