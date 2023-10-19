<template>
  <lay-container fluid="true" class="option-box">
    <lay-card>
      <lay-form style="margin-top: 10px">
        <lay-row>
          <lay-col :md="5">
            <lay-form-item label="用户账号" label-width="80">
              <lay-input
                v-model="searchQuery.userAccount"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="用户名" label-width="80">
              <lay-input
                v-model="searchQuery.userName"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="8">
            <lay-form-item label="登录时间" label-width="80">
              <lay-date-picker
                size="sm"
                v-model="searchQuery.rangeTime"
                range
                type="datetime"
                :placeholder="['开始日期', '结束日期']"
              ></lay-date-picker
            ></lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label-width="20">
              <lay-button
                style="margin-left: 20px"
                type="normal"
                size="sm"
                @click="toSearch"
              >
                查询
              </lay-button>
              <lay-button size="sm" @click="toReset"> 重置 </lay-button>
            </lay-form-item>
          </lay-col>
        </lay-row>
      </lay-form>
    </lay-card>
    <!-- table -->
    <div class="table-box">
      <lay-table
        :page="page"
        :height="'100%'"
        :columns="columns"
        :loading="loading"
        :default-toolbar="true"
        :data-source="dataSource"
        v-model:selected-keys="selectedKeys"
        @change="change"
        @sortChange="sortChange"
      >
        <template #requestPath="{ row }">
          <lay-tooltip
            :visible="false"
            trigger="hover"
            :content="row.requestPath"
          >
            <div class="oneRow">{{ row.requestPath }}</div>
          </lay-tooltip>
        </template>

        <template #status="{ row }">
          <div v-show="row.status == '正常'">
            <lay-tag color="#2dc570" variant="light">正常</lay-tag>
          </div>
          <div v-show="row.status == '失败'">
            <lay-tag color="#F5319D" variant="light">失败</lay-tag>
          </div>
        </template>
        <template #time="{ row }">
          <div class="oneRow">{{ row.time }}s</div>
        </template>
        <template v-slot:toolbar> </template>
        <template v-slot:operator="{ row }">
          <lay-button
            size="xs"
            border="green"
            border-style="dashed"
            @click="showDetail(row)"
            >详情</lay-button
          >
        </template>
      </lay-table>
    </div>

    <!-- layer -->

    <lay-layer v-model="visible11" title="详情" :area="['700px', '450px']">
      <div style="padding: 20px">
        <lay-row>
          <lay-col md="4" class="title">操作人</lay-col>
          <lay-col md="8" class="content">{{
            dataLayer.name + '(' + dataLayer.account + ')'
          }}</lay-col>
          <lay-col md="4" class="title">IP地址</lay-col>
          <lay-col md="8" class="content borderR">{{
            dataLayer.ipAddrees
          }}</lay-col>
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title">操作模块</lay-col>
          <lay-col md="8" class="content">{{ dataLayer.optionModule }}</lay-col>
          <lay-col md="4" class="title">操作功能</lay-col>
          <lay-col md="8" class="content borderR">{{
            dataLayer.optionFunction
          }}</lay-col>
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title">操作时间</lay-col>
          <lay-col md="8" class="content">{{ dataLayer.joinTime }}</lay-col>
          <lay-col md="4" class="title">请求耗时</lay-col>
          <lay-col md="8" class="content borderR"
            >{{ dataLayer.time }}s</lay-col
          >
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title">请求方式</lay-col>
          <lay-col md="8" class="content">{{
            dataLayer.requestMethod
          }}</lay-col>
          <lay-col md="4" class="title">请求状态</lay-col>
          <lay-col md="8" class="content borderR">
            <div v-show="dataLayer.status == '正常'">
              <lay-tag color="#2dc570" variant="light">正常</lay-tag>
            </div>
            <div v-show="dataLayer.status == '失败'">
              <lay-tag color="#F5319D" variant="light">失败</lay-tag>
            </div>
          </lay-col>
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title">请求地址</lay-col>
          <lay-col md="20" class="content borderR">{{
            dataLayer.requestPath
          }}</lay-col>
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title">调用方法</lay-col>
          <lay-col md="20" class="content borderR"
            >com.eleadmin.common.system.controller.LoginRecordController.page</lay-col
          >
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title">请求参数</lay-col>
          <lay-col md="20" class="content borderR"
            >{"nickname":"","limit":"10","page":"1","username":""}</lay-col
          >
        </lay-row>
        <lay-row>
          <lay-col md="4" class="title borderB">返回结果</lay-col>
          <lay-col md="20" class="content borderR borderB"
            >{"code":0,"message":"操作成功","data":{"list":[{"id":89548,"username":"admin","os":"Windows","device":"Windows
            10 or Windows Server
            2016","browser":"Chrome","ip":"113.128.81.221","loginType":3,"comments":null,"tenantId":4,"createTime":1689857372000,"updateTime":1689857372000,"userId":40,"nickname":"管理员"},{"id":89547,"username":"admin","os":"Win</lay-col
          >
        </lay-row>
      </div>
    </lay-layer>
  </lay-container>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { layer } from '@layui/layui-vue'
const searchQuery = ref({
  userAccount: '',
  userName: '',
  rangeTime: ['2001-01-01 01:01:00', '2001-02-1 01:01:00']
})

function toReset() {
  searchQuery.value = {
    userAccount: '',
    userName: '',
    rangeTime: ['2001-01-01 01:01:00', '2001-02-1 01:01:00']
  }
}

function toSearch() {
  page.current = 1
  change(page)
}

const loading = ref(false)
const selectedKeys = ref([])
const page = reactive({ current: 1, limit: 10, total: 100 })
const columns = ref([
  { title: '账号', key: 'account', sort: 'desc' },
  { title: '用户名', key: 'name', sort: 'desc' },
  { title: '操作模块', key: 'optionModule', sort: 'desc' },
  { title: '操作功能', width: '180px', key: 'optionFunction', sort: 'desc' },
  {
    title: ' 请求地址',
    width: '180px',
    key: 'requestPath',
    sort: 'desc',
    customSlot: 'requestPath'
  },
  { title: '请求方式', key: 'requestMethod' },

  {
    title: '状态',
    width: '100px',
    key: 'status',
    customSlot: 'status'
  },
  { title: '耗时', key: 'time', customSlot: 'time' },
  { title: '登录时间', width: '180px', key: 'joinTime' },
  {
    title: '操作',
    width: '100px',
    customSlot: 'operator',
    key: 'operator',
    fixed: 'right'
  }
])
const change = (page: any) => {
  loading.value = true
  setTimeout(() => {
    dataSource.value = loadDataSource(page.current, page.limit)
    loading.value = false
  }, 1000)
}
const sortChange = (key: any, sort: number) => {
  layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
}
const dataSource = ref([
  {
    id: '1',
    name: '管理员',
    account: 'admin',
    optionModule: '登录日志',
    optionFunction: '分页查询登录日志',
    requestPath: '/api/system/login-record/page',
    requestMethod: 'GET',
    time: '0.015',
    ipAddrees: '171.120.210.128',
    joinTime: '2022-02-09 15:09:34',
    status: '正常'
  },
  {
    id: '2',
    name: '用户1',
    account: 'admin',
    optionModule: '用户管理',
    optionFunction: '分页查询用户',
    requestPath: '/api/system/user/page',
    requestMethod: 'GET',
    time: '0.045',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '124.92.199.219'
  },
  {
    id: '3',
    account: 'admin',
    name: '管理员',
    optionModule: '登录日志',
    requestMethod: 'GET',
    requestPath: '/api/system/login-record/page',
    optionFunction: '分页查询登录日志',
    time: '0.027',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '39.155.212.237'
  },
  {
    id: '4',
    account: 'admin',
    name: '用户2',
    optionModule: '菜单管理',
    requestPath: '/api/system/menu/page',
    requestMethod: 'GET',
    optionFunction: '查询全部菜单',
    time: '2.397',
    joinTime: '2022-02-09 15:09:34',
    status: '失败',
    ipAddrees: '113.65.14.222'
  },
  {
    id: '5',
    account: 'admin',
    name: '管理员',
    optionModule: '文件上传下载',
    requestPath: '/api/file/page',
    requestMethod: 'GET',
    optionFunction: '分页查询文件',
    time: '0.016',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '113.128.81.221'
  },
  {
    id: '6',
    account: 'admin',
    name: '管理员',
    optionModule: '文件上传下载',
    requestPath: '/api/file/page',
    requestMethod: 'GET',
    optionFunction: '分页查询文件',
    time: '0.051',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '182.48.101.103'
  },
  {
    id: '7',
    account: 'admin',
    name: '用户1',
    optionModule: '菜单管理',
    requestPath: '/api/system/menu/page',
    requestMethod: 'GET',
    optionFunction: '查询全部菜单',
    time: '0.231',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '171.213.58.73'
  },
  {
    id: '8',
    account: 'admin',
    name: '用户1',
    optionModule: '菜单管理',
    requestPath: '/api/system/menu/page',
    requestMethod: 'GET',
    optionFunction: '查询全部菜单',
    time: '0.47',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '119.143.100.106'
  },
  {
    id: '9',
    account: 'admin',
    name: '管理员',
    optionModule: '登录日志',
    requestMethod: 'GET',
    requestPath: '/api/system/login-record/page',
    optionFunction: '分页查询登录日志',
    time: '0.015',
    joinTime: '2022-02-09 15:09:34',
    status: '失败',
    ipAddrees: '139.162.18.175'
  },
  {
    id: '10',
    account: 'admin',
    name: '管理员',
    optionModule: '登录日志',
    requestMethod: 'GET',
    requestPath: '/api/system/login-record/page',
    optionFunction: '分页查询登录日志',
    time: '0.015',
    joinTime: '2022-02-09 15:09:34',
    status: '正常',
    ipAddrees: '14.215.245.130'
  }
])
const loadDataSource = (page: number, pageSize: number) => {
  var response = []
  var startIndex = (page - 1) * pageSize + 1
  var endIndex = page * pageSize
  for (var i = startIndex; i <= endIndex; i++) {
    response.push({
      id: `${i}`,
      optionModule: '登录日志',
      requestMethod: 'GET',
      requestPath: '/api/system/login-record/page',
      optionFunction: '分页查询登录日志',
      account: 'admin',
      status: '正常',
      name: '管理员',
      time: '0.015',
      joinTime: '2022-02-09 15:09:34',
      ipAddrees: '111.121.13.184'
    })
  }
  return response
}
const dataLayer = ref({
  id: '0',
  optionModule: '',
  requestMethod: '',
  requestPath: '',
  optionFunction: '',
  account: '',
  status: '',
  name: '',
  time: '',
  joinTime: '',
  ipAddrees: ''
})
const visible11 = ref(false)
function showDetail(row: any) {
  visible11.value = true
  dataLayer.value = row
}
</script>

<style scoped>
.option-box {
  width: calc(100vw - 220px);
  height: calc(100vh - 110px);
  margin-top: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.top-search {
  margin-top: 10px;
  padding: 10px;
  height: 40px;
  border-radius: 4px;
  background-color: #fff;
}
.table-box {
  margin-top: 10px;
  padding: 10px;
  height: 700px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
}

.search-input {
  display: inline-block;
  width: 98%;
  margin-right: 10px;
}
.table-style {
  margin-top: 10px;
}
.isChecked {
  display: inline-block;
  background-color: #e8f1ff;
  color: red;
}
.oneRow {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.title {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  display: inline-block;
  background: #f7f7f7;
  border-top: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
}
.content {
  height: 40px;
  line-height: 40px;
  padding: 0 3px 0 10px;
  border-top: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.borderR {
  border-right: 1px solid #e8e8e8;
}
.borderB {
  border-bottom: 1px solid #e8e8e8;
}
</style>