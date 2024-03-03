import request from "@/api/request.js"

//登录
export function login(account, password) {
    const data = {
        "username": account, "password": password
    }
    return request({
        url: "/login",
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: "post",
        data: data
    })
}

export function phoneLogin(phoneNumber, captcha) {
    const data = {
        phoneNumber, captcha
    }
    return request({
        url: "/phoneLogin",
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: "post",
        data: data
    })
}

// 注册
export function register(data) {
    return request({
        url: '/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 获取验证码
export function captcha() {
    console.log("222")
    return request({
        url: '/captcha',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}