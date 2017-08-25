import _defaultConfig from '../config'
import { checkStatus } from '../utils'

const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json"
}

const _parseResponse = (response) => {
    return response.text()
}

const api = {
    // 获取验证码code 
    getRandomCode: function (params) {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/article/tologin`, {
                headers
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    },

    // 提交登录
    loginUser: function (params) {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/article/login`, {
                headers,
                method: 'POST',
                body: JSON.stringify(params)
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    },
    // 获取文章分类
    getArticleLabelList: function () {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/app/article/label`, {
                method:"POST",
                headers: Object.assign({}, headers, {
                    cookieId: localStorage.getItem("cookieId")
                }),
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    },

    // 获取文章列表
    getArticleList: function (params) {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/article/articles`, {
                method: 'POST',
                headers: Object.assign({}, headers, {
                    cookieId: localStorage.getItem("cookieId")
                }),
                body: JSON.stringify(params)
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    },
    // 新增文章 /article/addarticle
    createArticle: function ({ label, title, content }) {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/article/addarticle`, {
                method: 'POST',
                headers: Object.assign({}, headers, {
                    cookieId: localStorage.getItem('cookieId')
                }),
                body: JSON.stringify({ label, title, content })
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    },
    // 查看文章
    queryArticleByUUId: function (uuid) {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/article/article/${uuid}`, {
                method:'POST',
                headers: Object.assign({}, headers, {
                    cookieId: localStorage.getItem('cookieId')
                }),
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    },
    // 删除文章
    deleteArticleById: function ({id}) {
        return new Promise((resolve, reject) => {
            fetch(`${_defaultConfig.host}/article/delarticle`, {
                method:'POST',
                headers: Object.assign({}, headers, {
                    cookieId: localStorage.getItem('cookieId')
                }),
                body: JSON.stringify({id})
            }).then(checkStatus)
                .then(_parseResponse)
                .then(text => {
                    resolve(JSON.parse(text))
                }).catch(err => {
                    reject(err)
                })
        })
    }
}

export default api

