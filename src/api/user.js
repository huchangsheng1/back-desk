import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

// 返回个人所有信息
export function getPersonal() {
  return request({
    url: '/user/personal',
    method: 'get',
  })

}


export function alterUserpwd(data) {
  return request({
    url: '/user/alter',
    method: 'post',
    data
  })
}
