import request from '@/utils/request'

export function course_render(params) {   //课程渲染
    return request({
      url: '/course/rendercourses',
      method: 'get',
      params
    })
}

export function course_selectcourses(params) {   //上传橱窗图
  return request({
    url: '/course/selectcourses',
    method: 'get',
    params
  })
}

export function course_found(data) {   //创建课程
  return request({
    url: '/course/foundcourse',
    method: 'post',
    data
  })
}

export function course_found_windowimage(data) {   //上传橱窗图
  return request({
    url: 'course/windowimage',
    method: 'post',
    data
  })
}


export function course_renderfoundcourses(params) {   //获取班级
  return request({
    url: '/course/renderfoundcourses',
    method: 'get',
    params
  })
}

export function course_rendereditcourses(params) {   //编辑回显
  return request({
    url: '/course/rendereditcourses',
    method: 'get',
    params
  })
}

export function course_editcourses(data) {   //确认编辑
  return request({
    url: '/course/editcourses',
    method: 'post',
    data
  })
}

export function course_deletecourses(data) {   //删除课程
  return request({
    url: '/course/deletecourses',
    method: 'post',
    data
  })
}


/******************************************************************************/
export function course_foundchapters(params) {   //章节渲染
  return request({
    url: '/course/foundchapters',
    method: 'get',
    params
  })
}


export function course_sectionresource(params) {   //节资源
  return request({
    url: '/course/sectionresource',
    method: 'get',
    params
  })
}

export function course_foundchapter(data) {   //创建章节
  return request({
    url: '/course/foundchapter',
    method: 'post',
    data
  })
}

export function course_deletechapter(data) {   //删除章节
  return request({
    url: '/course/deletechapter',
    method: 'post',
    data
  })
}


export function course_fileupload(data) {   //资源上传
  return request({
    url: '/file/fileupload',
    method: 'post',
    data
  })
}

export function course_editchapter(params) {   //编辑资源渲染
  return request({
    url: '/course/editchapter',
    method: 'get',
    params
  })
}


/************************************/

export function course_setchapter(data) {   //修改章节
  return request({
    url: '/course/setchapter',
    method: 'post',
    data
  })
}


export function course_addsection(data) {   //添加节
  return request({
    url: '/course/addsection',
    method: 'post',
    data
  })
}


export function course_uploadresources(data) {   //节上传资源
  return request({
    url: '/course/uploadresources',
    method: 'post',
    data
  })
}

export function course_delete_dir(data) {   //节上传资源
  return request({
    url: '/file/deletedir',
    method: 'post',
    data
  })
}

/*******************问答****************************/
export function course_selectask(params) {   //显示问题
  return request({
    url: '/forum/selectask',
    method: 'get',
    params
  })
}

export function course_showask(params) {   //查看问题回答
  return request({
    url: '/forum/showask',
    method: 'get',
    params
  })
}

export function course_addreplay(data) {   //回答问题
  return request({
    url: '/forum/addreplay',
    method: 'post',
    data
  })
}












