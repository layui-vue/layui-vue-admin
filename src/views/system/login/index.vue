<template>
  <lay-container fluid="true" class="login-box">
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
        <template #unitType="{ row }">
          <lay-tooltip :visible="false" trigger="hover" :content="row.unitType">
            <div class="oneRow">{{ row.unitType }}</div>
          </lay-tooltip>
        </template>

        <template #operatingType="{ row }">
          <div v-show="row.operatingType == '登录成功'">
            <lay-tag color="#2dc570" variant="light">登录成功</lay-tag>
          </div>
          <div v-show="row.operatingType == '登录失败'">
            <lay-tag color="#F5319D" variant="light">登录失败</lay-tag>
          </div>
        </template>
        <template #remark="{ row }">
          <lay-tooltip :visible="false" trigger="hover" :content="row.remark">
            <div class="oneRow">{{ row.remark }}</div>
          </lay-tooltip>
        </template>
        <template v-slot:toolbar> </template>
        <template v-slot:operator="{ row }">
          <lay-popconfirm
            content="确定要删除此条登录记录吗?"
            @confirm="confirm(row)"
            @cancel="cancel"
          >
            <lay-button size="xs" border="red" border-style="dashed"
              >删除</lay-button
            >
          </lay-popconfirm>
        </template>
      </lay-table>
    </div>
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
const selectedKeys = ref()
const page = reactive({ current: 1, limit: 10, total: 100 })
const columns = ref([
  { title: '账号', key: 'account', sort: 'desc' },
  { title: '用户名', key: 'name', sort: 'desc' },
  { title: 'IP地址', key: 'ipAddrees', sort: 'desc' },
  {
    title: '设备型号',
    width: '220px',
    key: 'unitType',
    sort: 'desc',
    customSlot: 'unitType'
  },
  { title: '操作系统', key: 'operatingSystem' },
  {
    title: '操作类型',
    width: '120px',
    key: 'operatingType',
    customSlot: 'operatingType'
  },
  { title: '浏览器', key: 'browser' },
  { title: '备注', width: '220px', key: 'remark', customSlot: 'remark' },
  { title: '登录时间', width: '220px', key: 'joinTime' }
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
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'Chrome',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    ipAddrees: '171.120.210.128',
    operatingType: '登录成功'
  },
  {
    id: '2',
    name: '用户1',
    account: 'admin',
    operatingSystem: 'Android',
    unitType: 'Android',
    browser: 'DingTalk',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '124.92.199.219'
  },
  {
    id: '3',
    account: 'admin',
    name: '管理员',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'Firefox',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '39.155.212.237'
  },
  {
    id: '4',
    account: 'admin',
    name: '用户2',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'Chrome',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录失败',
    ipAddrees: '113.65.14.222'
  },
  {
    id: '5',
    account: 'admin',
    name: '管理员',
    operatingSystem: 'Android',
    unitType: 'Android',
    browser: 'Chrome',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '113.128.81.221'
  },
  {
    id: '6',
    account: 'admin',
    name: '管理员',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'MSEdge',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '182.48.101.103'
  },
  {
    id: '7',
    account: 'admin',
    name: '用户1',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'MSEdge',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '171.213.58.73'
  },
  {
    id: '8',
    account: 'admin',
    name: '用户1',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'MicroMessenger',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '119.143.100.106'
  },
  {
    id: '9',
    account: 'admin',
    name: '管理员',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'Chrome',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录失败',
    ipAddrees: '139.162.18.175'
  },
  {
    id: '10',
    account: 'admin',
    name: '管理员',
    operatingSystem: 'Windows',
    unitType: 'Windows 10 or Windows Server 2016',
    browser: 'Chrome',
    remark: '花开堪折直须折,莫待无花空折枝.',
    joinTime: '2022-02-09 15:09:34',
    operatingType: '登录成功',
    ipAddrees: '14.215.245.130'
  }
])
const changeStatus = (isChecked: boolean, row: any) => {
  dataSource.value.forEach((item: any) => {
    if (item.id === row.id) {
      layer.msg('Success', { icon: 1 }, () => {
        item.ipAddrees = isChecked
      })
    }
  })
}
const remove = () => {
  layer.msg(selectedKeys.value, { area: '50%' })
}
const loadDataSource = (page: number, pageSize: number) => {
  var response = []
  var startIndex = (page - 1) * pageSize + 1
  var endIndex = page * pageSize
  for (var i = startIndex; i <= endIndex; i++) {
    response.push({
      id: `${i}`,
      browser: 'Chrome',
      operatingSystem: 'Windows',
      account: 'admin',
      operatingType: '登录成功',
      name: '管理员',
      remark: '花开堪折直须折,莫待无花空折枝.',
      joinTime: '2022-02-09 15:09:34',
      unitType: 'Windows 10 or Windows Server 2016',
      ipAddrees: '111.121.13.184'
    })
  }
  return response
}
function confirm(row: any) {
  layer.msg('您已成功删除')
}
function cancel() {
  layer.msg('您已取消操作')
}
</script>

<style scoped>
.login-box {
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

.isChecked {
  display: inline-block;
  background-color: #e8f1ff;
  color: red;
}
.oneRow {
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>