import request from '@/utils/request'

//获取角色
export function getrole() {
    return request({
      url: '/power/roleshow',
      method: 'get',
    })
}
//获取所有权限
export function getrolepower(params) {
    return request({
        url: '/power/rolepower?rid=1',
        method : 'get',
        params
    })
}
//获取所有权限
export function getrolepower2(params) {
    return request({
        url: '/power/rolepower',
        method : 'get',
        params
    })
}

//修改角色名
export function setrname(data) {
    return request({
        url: '/power/rolealter',
        method : 'POST',
        data
    })
}


//创建角色并且添加权限
export function createrole(data) {
    return request({
        url: '/power/addroleandpow',
        method : 'POST',
        data
    })
}


//更新权限
export function updaterole(data) {
    return request({
        url: '/power/updatepower',
        method : 'POST',
        data
    })
}