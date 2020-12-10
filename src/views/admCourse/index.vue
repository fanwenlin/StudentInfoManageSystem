<template>
  <div class="app-container">
    <el-row :gutter="40" type="flex" justify="center">
      <el-col :span="1"><el-tag>学院</el-tag></el-col>
      <el-col :span="4">
        <el-select v-model="schoolVal" size="small" placeholder="请选择">
          <el-option
            v-for="item in schoolOpt"
            :key="item.schoolVal"
            :label="item.label"
            :value="item.schoolVal"
            :disabled="item.disabled"
          />
        </el-select>
      </el-col>
      <el-col :span="1"><el-tag>年级</el-tag></el-col>
      <el-col :span="4">
        <div class="block">
          <span class="demonstration" />
          <el-select v-model="gradeVal" size="small" placeholder="请选择">
            <el-option
              v-for="item in gradeOpt"
              :key="item.gradeVal"
              :label="item.label"
              :value="item.gradeVal"
              :disabled="item.disabled"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="1"><el-tag>课程</el-tag></el-col>
      <el-col :span="4">
        <el-input
          v-model="courseName"
          size="small"
          placeholder="请输入内容"
          clearable
        />
      </el-col>
      <el-col :span="2"><el-button size="small" type="primary">查询</el-button></el-col>
      <el-col :span="2"><el-button size="small" type="danger" icon="el-icon-edit">编辑模式</el-button></el-col>
    </el-row>
    <el-row><el-col><br></el-col></el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      height="540"
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
      <el-table-column label="编辑" width="120" align="center">
        <el-button size="small">编辑</el-button>
      </el-table-column>
    </el-table>
    <el-row><el-col><br></el-col></el-row>
    <el-row :gutter="40" type="flex" justify="end">
      <el-col :span="4">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="warning">从文件导入</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传.xlsx/.xls文件</div>
        </el-upload>
      </el-col>
      <el-col :span="2"><el-button type="primary" size="small" disabled>保存</el-button></el-col>
    </el-row>
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
      list: null,
      listLoading: true,
      schoolOpt: [
        { schoolVal: 'MEIE', label: '机电与信息工程学院' },
        { schoolVal: 'ESE', label: '应急管理与安全工程学院' },
        { schoolVal: 'EME', label: '能源与矿业学院' },
        { schoolVal: 'LH', label: '文法学院' },
        { schoolVal: 'GSE', label: '管理学院' },
        { schoolVal: 'CEE', label: '化学与环境工程学院' }
      ],
      schoolVal: '',
      gradeVal: '',
      gradeOpt: [
        { gradeVal: '2018', label: '2018级' },
        { gradeVal: '2019', label: '2019级' },
        { gradeVal: '2020', label: '2020级' }
      ],
      stuId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourseInfo().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleChange(classVal) {
      console.log(classVal)
    }
  }
}
</script>

<style>
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
