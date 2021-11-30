import request from '@/utils/request'

//获取日志
export function getlog() {
    return request({
      url: '/log/selectlog',
      method: 'get',
    })
  }

//模糊查询
export function getlog2(data) {
    return request({
        url: '/log/selectlog',
        method: 'get',
        params :data
    })
}
//翻页
export function getpage(data) {
    return request({
        url: '/log/selectlog',
        method: 'get',
        params :data
    })
}

//删除
export function deletlog(data) {
    return request({
        url: '/log/dellog',
        method: 'post',
        data : {
            log_keyArr:data
        }
    })
}