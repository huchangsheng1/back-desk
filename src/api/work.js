import request from '@/utils/request'

//上传作业
export function work_upjob(data) {
    return request({
      url: 'task/upjob',
      method: 'post',
      data
    })
  }

//渲染作业
  export function lookwork(data) {
    return request({
      url: 'task/teacherwork',
      method: 'get',
      data
    })
  }
//删除作业
  export function deletework(data) {
    return request({
      url: 'task/delwork',
      method: 'post',
      data
    })
  }

//查看作业跳转到批界面
export function correctingwork(data) {
  return request({
    url: 'task/correctingwork',
    method: 'get',
    params :data
  })
}

//查看所有学生的作业内容
export function Lookstudentworks(data) {
  return request({
    url: 'task/teacherlookwork',
    method: 'get',
    params :data
  })
}


export function HomeWorkCorrecting(data) {
  return request({
    url: 'task/teachercorrect',
    method: 'get',
    params :data
  })
}
//教师查看作业模块下的班级
export function LookClass(data) {
  return request({
    url: 'task/classname',
    method: 'get',
    params :data
  })
}


