import request from '@/utils/request'

export function power() {
    return request({
      url: '/power/pshow',
      method: 'get',
    })
  }

  export function  powershow() {
    return request({
      url: '/power/rolepower?rid=1',
      method: 'get',
    })
  }
  

//修改权限名称
  export function poweralter(data) {
    return request({
      url: '/power/powername',
      method: 'post',
      data
    })
  }
  
  //获取所有菜单
  export function powermenu() {
    return request({
      url: '/power/powermenu',
      method: 'get',
    })
  }



  //添加权限和菜单
  export function powerpadd(data) {
    return request({
      url: '/power/padd',
      method: 'post',
      data
    })
  }