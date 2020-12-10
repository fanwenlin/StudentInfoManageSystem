import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/demo/table/list',
    method: 'get',
    params
  })
}

export function getCourseInfo(params) {
  return request({
    url: '/demo/student_data',
    // url: 'http://localhost:8080/demo/demo/student_data',
    method: 'get',
    params
  })
}
