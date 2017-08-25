import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
const FormItem = Form.Item
const InputGroup = Input.Group

class Login extends Component {
    static propTypes = {
    randomCodeKey: PropTypes.string,
    randomSrc: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    hasFeedback: PropTypes.bool,
    className: PropTypes.string,
    getFieldDecorator: PropTypes.func,
  };


    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.submitForm(values)
            }
        })
    }
    refreshRandomCode = (e) => {
        e.preventDefault()
        this.props.refreshRandomCode()
    }
    render() {
        const {randomCodeKey, randomSrc} = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem hasFeedback>
                    {getFieldDecorator('account', {
                        rules: [{
                            required: true, message: '请输入账号'
                        }]
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ fontSize: 14 }} />} placeholder="请输入用户名" />
                        )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('pwd', {
                        rules: [{
                            required: true, message: '请输入密码'
                        }]
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="请输入密码" />
                        )}
                </FormItem>
                <FormItem>
                    <InputGroup compact>
                        {getFieldDecorator('randomCode', {
                            rules: [{
                                required: true, message: '请输入验证码'
                            }]
                        })(
                            < Input size="large"
                                 placeholder="请输入验证码" 
                            />
                            )}
                        <a href="#" onClick={this.refreshRandomCode} className="login-form__randomImg" >
                            { randomCodeKey && <img src={randomSrc} alt='' />}
                        </a>
                    </InputGroup>
                </FormItem>
                <FormItem>
                    <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const ArticleLoginForm = Form.create({})(Login);

export default ArticleLoginForm