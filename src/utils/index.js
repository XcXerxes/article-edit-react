
// 检查 fetch 状态码
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        const error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

// 登录超时

const reLoginToIndex = (message, his) => {
    /*localStorage.removeItem('cookieId')
    localStorage.removeItem("username")
    localStorage.removeItem("userhead")*/
    localStorage.clear()
    message.error('登录超时,请重新登录',1,()=>{
        his.push('/')
    })
}



export { 
    checkStatus,
    reLoginToIndex
}