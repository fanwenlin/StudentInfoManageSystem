const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
const course_data = Mock.mock({
  'items|30': [{
    'courseName|6-10': /[A-z]/,
    'courseId|10000-99999': 1,
    'courseType|1': [3, 1, 2],
    'courseStat|1': [0, 1],
    'tmpName|4-5': /[a-z]/,
    'tmpId|1000000-9999999': 1,
    'school|1-5': 1,
    'credit|1': [1, 2, 3, 4],
    'curNum|0-30': 1,
    'maxNum|31-100': 1,
    'score|60-100': 1,
    'semester|1-3': 1,
    'grade|1-3': 1,
    'class|1-4': 1,
    'sex|1': [0, 1],
    'stuStat|1': [0, 1],
    'tchStat|1': [0, 1],
    'age|18-70': 1,
    'title|1-3': 1
  }]
})

module.exports = [
  {
    url: '/demo/table/list',
    // url: 'http://localhost:8080/demo/demo/student_data',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }, {
    url: '/demo/student_data',
    type: 'get',
    response: config => {
      const items = course_data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
