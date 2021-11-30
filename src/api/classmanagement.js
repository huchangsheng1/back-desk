import request from '@/utils/request'

export function grade_find(params) {
    return request({                //班级渲染
      url: '/grade/find',
      method: 'get',
      params
    })
}

export function grade_create(data) {
    return request({                //班级渲染
      url: '/grade/create',
      method: 'post',
      data
    })
}

export function grade_alterst(data) {
  return request({                //班级编辑
    url: '/grade/alterst',
    method: 'post',
    data
  })
}

export function grade_showst(params) {
  return request({                //班级详情
    url: '/grade/showst',
    method: 'get',
    params
  })
}

export function grade_delst(data) {
  return request({                //移出学生
    url: '/grade/delst',
    method: 'post',
    data
  })
}

export function grade_del(data) {
  return request({                //解散班级
    url: '/grade/del',
    method: 'post',
    data
  })
}