import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/finduser',
    method: 'get',
    params
  })
}

export function findsgrade(params) {
  return request({
    url: '/grade/findsgrade',
    method: 'get',
    params
  })
}

// 添加用户
export function adduser(data) {
  return request({
    url: '/user/adduser',
    method: 'post',
    data
  })
}

// 删除用户
export function deluser(data) {
  return request({
    url: '/user/deluser',
    method: 'post',
    data
  })
}

// 修改用户回显
export function showuser(data) {
  return request({
    url: '/user/echo',
    method: 'post',
    data
  })
}

// 修改用户
export function alterusers(data) {
  return request({
    url: 'user/alteruser',
    method: 'post',
    data
  })
}

// 重置密码
export function resetpasswd(data) {
  return request({
    url: '/user/alter',
    method: 'post',
    data
  })
}