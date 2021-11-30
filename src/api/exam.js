import request from '@/utils/request'

// 所有考试
export function showexam(params) {
    return request({
        url: '/exam/exameach',
        method: 'get',
        params
    })
}

// 个人信息
export function personal(params) {
    return request({
        url: '/user/personal',
        method: 'get',
        params
    })
}

// 手动录题
export function createtopic(data) {
    return request({
        url: '/exam',
        method: 'post',
        data
    })
}

// 题库随机抽题
export function randomtopic(data) {
    return request({
        url: '/exam/questions',
        method: 'post',
        data
    })
}

// 上传Excel文件
export function exltopic(data) {
    return request({
        url: '/exam/upexcel',
        method: 'post',
        data
    })
}

// Excel文件导题
export function pourintopic(data) {
    return request({
        url: '/exam/pourinexcel',
        method: 'post',
        data
    })
}
 
// 发布考试 strike
export function issueexam(params) {
    return request({
        url: '/exam/relexam',
        method: 'get',
        params
    })
}

// 删除考试
export function strikeexam(params) {
    return request({
        url: '/exam/delexam',
        method: 'get',
        params
    })
}

// 修改考试数据回显
export function alterexam(params) {
    return request({
        url: '/exam/revise',
        method: 'get',
        params
    })
}

// 确认修改考试
export function confirm(data) {
    return request({
        url: '/exam/revise',
        method: 'post',
        data
    })
}

// 待批改考试渲染
export function stayexam(params) {
    return request({
        url: '/exam/showtestpaper',
        method: 'get',
        params
    })
}

// 批改考试
export function reviewexam(params) {
    return request({
        url: '/exam/showdetails',
        method: 'get',
        params
    })
}

// 完成批改  showgrade
export function completereview(data) {
    return request({
        url: '/exam/correct',
        method: 'post',
        data
    })
}

// 查找班级
export function findgrade(params) {
    return request({
        url: '/exam/showgrade',
        method: 'get',
        params
    })
}

// 查找课程
export function findcourse(params) {
    return request({
        url: '/exam/findclass',
        method: 'get',
        params
    })
}