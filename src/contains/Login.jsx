import React, { Component } from 'react'
import { message,Layout } from 'antd'
import moment from 'moment'
import md5 from 'blueimp-md5'
import config from '../config'
import api from '../Api'
import LoginHeader from '../components/Login/Login-header'
import ArticleLoginForm from '../components/Login/Login-form'
import PropTypes from 'prop-types'

const {Content} = Layout

/*import {
  BrowserRouter as Router,
} from 'react-router-dom' */
export default class Login extends Component {
    static propTypes = {
    submitForm:PropTypes.func,
    className:PropTypes.string
  };
    constructor(args) {
        super(args)
        this.state = {
            randomSrc: ''
        }
    }
    // 获取验证码
    getRandomSrc() {
        api.getRandomCode().then(data => {
            if (data.code === '1') {
                //this.setState({randomCodeKey: data.randomCodeKey})
                this.randomCodeKey = data.randomCodeKey
                this.setState({ randomSrc: `${config.host}/${data.randomCodeKey}/randCode` })
            } else {
                message.error('请求错误')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // 更新验证码
    refreshRandomCode() {
        this.setState({
            randomSrc: `${config.host}/${this.randomCodeKey}/randCode?${moment(new Date())}`
        })
    }
    componentDidMount() {
        this.getRandomSrc()
    }
    handler() {
        const { history } = this.props
        history.push('/article')
    }
    // login登陆
    submitForm(values) {
        const params = Object.assign({}, values, {
            pwd: md5(values.pwd),
            randomCodeKey:this.randomCodeKey
        })
        api.loginUser(params).then(data => {
            if (data.code === '1') {
                message.success('登录成功')
                localStorage.setItem("cookieId", data.cookieId);
                localStorage.setItem("username", data.name);
                localStorage.setItem("userhead", `${config.host}/${data.headImg}/showImg`);
                this.props.history.push('/article')
            }else {
                message.error(data.des)
                this.getRandomSrc()
            }
        }).catch(err=>{
            console.log(err)
        })

    }

    render() {
        return (
            <Layout style={{height:'100%'}}>
                <LoginHeader />
                <Content style={{height:'100%'}}>
                    <div className="login">
                        <div className="login-content">
                            <div className='login-content__logo'>
                                <img src={require('../assets/images/logo.png')} alt="" />
                            </div>
                            <ArticleLoginForm clickHandler={this.handler.bind(this)}
                                submitForm={this.submitForm.bind(this)}
                                refreshRandomCode={this.refreshRandomCode.bind(this)}
                                randomCodeKey={this.randomCodeKey} randomSrc={this.state.randomSrc} />
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}