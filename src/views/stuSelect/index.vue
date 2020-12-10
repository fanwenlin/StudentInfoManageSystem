<template>
  <div class="app-container">
    <el-row :gutter="40" type="flex" justify="center">
      <el-col :span="2"><el-tag>选课列表</el-tag></el-col>
      <el-col :span="5">
        <el-select v-model="courseVal" size="small" placeholder="请选择">
          <el-option
            v-for="item in courseOpt"
            :key="item.courseVal"
            :label="item.label"
            :value="item.courseVal"
            :disabled="item.disabled"
          />
        </el-select>
      </el-col>
      <el-col :span="2"><el-tag>课程名称</el-tag></el-col>
      <el-col :span="4">
        <!-- <el-input
          v-model="courseName"
          size="small"
          placeholder="请输入内容"
          clearable
        /> -->
        <el-select
          v-model="courseId"
          size="small"
          placeholder="课程名称"
          filterable
          clearable
          @change="filter_list"
        >
          <el-option
            v-for="item in list"
            :key="item.courseId"
            :label="item.courseName"
            :value="item.courseId"
          />
        </el-select>
      </el-col>
      <el-col :span="2"><el-button size="small" type="primary">查询</el-button></el-col>
      <el-col :span="4"><div id="check"><el-checkbox v-model="checked">仅显示可选择课程</el-checkbox></div></el-col>
    </el-row>
    <el-row><el-col><br></el-col></el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort="{prop: 'courseId', order: 'ascending'}"
      element-loading-text="Loading"
      border
      fit
      height="600"
      stripe
      highlight-current-row
    >
      <el-table-column prop="courseId" label="课程ID" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column prop="school" label="开课学院" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.school == 1 ? "机电学院" : scope.row.school == 2 ? "安全学院" :
            scope.row.school == 3 ? "能源学院" : scope.row.school == 4 ? "理学院" : "化环学院" }}
        </template>
      </el-table-column>
      <el-table-column prop="courseType" label="课程类型" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseType == 1 ? "必修课程": scope.row.courseType == 2 ? "选修课程" : "实践课程" }}
        </template>
      </el-table-column>
      <el-table-column prop="credit" label="学分" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.credit }}
        </template>
      </el-table-column>
      <el-table-column prop="curNum" label="已选人数" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.curNum }}
        </template>
      </el-table-column>
      <el-table-column prop="maxNum" label="课程容量" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.maxNum }}
        </template>
      </el-table-column>
      <el-table-column label="选课" width="120" align="center">
        <el-button size="small">选课</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCourseInfo } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      rawlist: null,
      list: null,
      listLoading: true,
      courseOpt: [
        { courseVal: 'Online19-20-2', label: '19-20-2线上网络课程' },
        { courseVal: 'Retake19-20-2', label: '19-20-2重修课程' },
        { courseVal: 'Shahe19-20-2', label: '19-20-2沙河通选课', disabled: true },
        { courseVal: 'Xueyuan19-20-2', label: '19-20-2学院路通选课', disabled: true },
        { courseVal: 'Online19-20-1', label: '19-20-1线上网络课程', disabled: true },
        { courseVal: 'Retake19-20-1', label: '19-20-1重修课程', disabled: true },
        { courseVal: 'Shahe19-20-1', label: '19-20-1沙河通选课', disabled: true },
        { courseVal: 'Xueyuan19-20-1', label: '19-20-1学院路通选课', disabled: true }
      ],
      courseVal: '',
      courseId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourseInfo().then(response => {
        this.rawlist = response.data.items
        this.list = this.rawlist
        // this.filter_list()
        this.listLoading = false
      })
    },
    courseListchange() {
    },
    filter_list() {
      console.log(123)
      this.list = this.rawlist.filter(this.getfilter())
    },
    getfilter() {
      if (this.courseId != null && Number(this.courseId) !== 0) return x => x.courseId === this.courseId
      return x => true
    }
  }
}

</script>

<style>
#check{ margin:7px 0 0 -20px; }
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
</style>
