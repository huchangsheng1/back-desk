import request from '@/utils/request'

// 返回个人所有信息
export function getPersonal() {
    return request({
      url: '/user/personal',
      method: 'get',
    })
  
}

// 渲染所有题目
export function showquestions(params) {
    return request({
        url: '/question/index',
        method: 'get',
        params
    })
}

// 删除题目
export function delquestions(data) {
    return request({
        url: '/question/deletetopic',
        method: 'post',
        data
    })
}

// 修改题目
export function alterquestions(data) {
    return request({
        url: '/question/altertopic',
        method: 'post',
        data
    })
}