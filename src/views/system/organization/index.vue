<template>
  <lay-container fluid="true" class="organization-box">
    <div style="display: flex">
      <div :style="{ width: isFold ? `0px` : `300px` }" class="left-tree">
        <!-- tree -->
        <div v-show="!isFold">
          <lay-button type="normal" size="sm" @click="toAdd">
            <lay-icon type="layui-icon-addition"></lay-icon>新建
          </lay-button>
          <lay-button type="warm" size="sm" @click="toEdit">
            <lay-icon type="layui-icon-edit"></lay-icon>修改
          </lay-button>
          <lay-button type="danger" size="sm" @click="toDelete">
            <lay-icon type="layui-icon-delete"></lay-icon>删除
          </lay-button>
        </div>

        <lay-tree
          v-show="!isFold"
          style="margin-top: 10px"
          :data="data"
          v-model:selectedKey="selectedKey"
          :showLine="showLine"
          :expandKeys="[1, 3, 4]"
          @node-click="handleClick"
        >
          <template #title="{ data }">
            <span :class="selectedKey == data.id ? 'isChecked' : ''">
              {{ data.title }} {{ data.id }}
            </span>
          </template>
        </lay-tree>
        <div class="isFold" @click="isFold = !isFold">
          &nbsp;<lay-icon v-if="!isFold" class="layui-icon-left"></lay-icon>
          <lay-icon v-else class="layui-icon-right"></lay-icon>
        </div>
      </div>
      <div style="flex: 1; padding: 10px; over-flow: auto">
        <!-- table -->
        <lay-card>
          <lay-form>
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
              <lay-col :md="5">
                <lay-form-item label="性别" label-width="80">
                  <lay-select
                    class="search-input"
                    size="sm"
                    v-model="searchQuery.sex"
                    :allow-clear="true"
                    placeholder="请选择"
                  >
                    <lay-select-option
                      value="man"
                      label="男"
                    ></lay-select-option>
                    <lay-select-option
                      value="woman"
                      label="女"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
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
          <template #status="{ row }">
            <lay-switch
              :model-value="row.status"
              @change="changeStatus($event, row)"
            ></lay-switch>
          </template>
          <template #role="{ row }">
            <lay-tag color="#165DFF" variant="light">{{ row.role }}</lay-tag>
          </template>

          <template v-slot:toolbar>
            <lay-button
              size="sm"
              type="primary"
              @click="changeVisible11('新增', null)"
              >新增</lay-button
            >
            <lay-button size="sm" @click="toRemove">删除</lay-button>
          </template>
          <template v-slot:operator="{ row }">
            <lay-button
              size="xs"
              border="green"
              border-style="dashed"
              @click="changeVisible11('编辑', row)"
              >编辑</lay-button
            >
            <lay-popconfirm
              content="确定要删除此用户吗?"
              @confirm="confirm"
              @cancel="cancel"
            >
              <lay-button size="xs" border="red" border-style="dashed"
                >删除</lay-button
              >
            </lay-popconfirm>
          </template>
        </lay-table>
      </div>
    </div>
    <lay-layer v-model="visible11" :title="title" :area="['500px', '450px']">
      <div style="padding: 20px">
        <lay-form :model="model11" ref="layFormRef11" required>
          <lay-form-item label="用户账号" prop="account">
            <lay-input v-model="model11.account"></lay-input>
          </lay-form-item>
          <lay-form-item label="用户名" prop="name">
            <lay-input v-model="model11.name"></lay-input>
          </lay-form-item>
          <lay-form-item label="性别" prop="sex">
            <lay-select v-model="model11.sex" style="width: 100%">
              <lay-select-option value="男" label="男"></lay-select-option>
              <lay-select-option value="女" label="女"></lay-select-option>
            </lay-select>
          </lay-form-item>
          <lay-form-item label="角色" prop="role">
            <lay-input v-model="model11.role"></lay-input>
          </lay-form-item>
          <lay-form-item label="状态" prop="status">
            <lay-switch :model-value="model11.status"></lay-switch>
          </lay-form-item>
        </lay-form>
        <div style="width: 100%; text-align: center">
          <lay-button size="sm" type="primary" @click="toSubmit"
            >保存</lay-button
          >
          <lay-button size="sm" @click="toCancel">取消</lay-button>
        </div>
      </div>
    </lay-layer>

    <lay-layer v-model="visible22" :title="title22" :area="['700px', '400px']">
      <div style="padding: 20px">
        <lay-form :model="model22" ref="layFormRef11" required>
          <lay-row>
            <lay-col md="12">
              <lay-form-item label="上级机构" prop="organization">
                <lay-select v-model="model22.organization" style="width: 100%">
                  <lay-select-option value="1" label="研发部">
                  </lay-select-option>
                  <lay-select-option value="2" label="测试部">
                  </lay-select-option>
                  <lay-select-option value="3" label="设计部">
                  </lay-select-option>
                  <lay-select-option value="4" label="市场部">
                  </lay-select-option>
                  <lay-select-option value="5" label="运维部">
                  </lay-select-option>
                </lay-select>
              </lay-form-item>
              <lay-form-item label="机构名称" prop="name">
                <lay-input v-model="model22.name"></lay-input>
              </lay-form-item>
              <lay-form-item label="机构全称" prop="fullName">
                <lay-input v-model="model22.fullName"></lay-input>
              </lay-form-item>
              <lay-form-item label="机构代码" prop="code">
                <lay-input v-model="model22.code"></lay-input>
              </lay-form-item>
            </lay-col>
            <lay-col md="12">
              <lay-form-item label="机构类型" prop="type">
                <lay-select v-model="model22.type" style="width: 100%">
                  <lay-select-option value="1" label="公司"></lay-select-option>
                  <lay-select-option value="2" label="子公司">
                  </lay-select-option>
                  <lay-select-option value="3" label="部门"></lay-select-option>
                  <lay-select-option value="4" label="小组"></lay-select-option>
                </lay-select>
              </lay-form-item>
              <lay-form-item label="排序号" prop="sort">
                <lay-input-number
                  style="width: 100%"
                  v-model="model22.sort"
                  position="right"
                ></lay-input-number>
              </lay-form-item>
              <lay-form-item label="备注" prop="remark">
                <lay-textarea
                  placeholder="请输入备注"
                  v-model="model22.remark"
                  :rows="4"
                ></lay-textarea>
              </lay-form-item>
            </lay-col>
          </lay-row>
        </lay-form>
        <div style="width: 100%; text-align: center">
          <lay-button size="sm" type="primary" @click="toSubmit"
            >保存</lay-button
          >
          <lay-button size="sm" @click="toCancel">取消</lay-button>
        </div>
      </div>
    </lay-layer>
  </lay-container>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { layer } from '@layui/layui-vue'

const data = ref([
  {
    title: 'xxxx公司',
    id: 1,
    checked: true,
    children: [
      {
        title: '研发部',
        id: 2,
        children: [
          {
            title: '研发一部',
            id: 3
          },
          {
            title: '研发二部',
            id: 4
          },
          {
            title: '研发三部',
            id: 5
          }
        ]
      },
      {
        title: '测试部',
        id: 6,
        children: [
          {
            title: '测试一部',
            id: 7,
            disabled: true
          },
          {
            title: '测试二部',
            id: 8
          }
        ]
      },
      {
        title: '设计部',
        id: 9
      },
      {
        title: '市场部',
        id: 10
      }
    ]
  }
])
const showLine = ref(false)
const selectedKey = ref('')
const selectedNode = ref({
  id: 0,
  title: ''
})
const isFold = ref(false)
const searchQuery = ref({
  userAccount: '',
  userName: '',
  sex: ''
})
function toReset() {
  searchQuery.value = {
    userAccount: '',
    userName: '',
    sex: ''
  }
}
function handleClick(node: any) {
  selectedNode.value = JSON.parse(JSON.stringify(node))
  page.current = selectedNode.value.id
  change(page)
}
function toAdd() {
  visible22.value = true
}
function toEdit() {
  model22.value = {
    organization: '1',
    name: '研发部',
    fullName: 'xxxx公司-研发部',
    code: '001',
    type: '1',
    sort: 1,
    remark: '备注'
  }
  visible22.value = true
}
function toDelete() {
  if (selectedKey.value == '') {
    layer.msg('您未选择组织机构，请先选择要删除的组织机构', {
      icon: 3,
      time: 2000
    })
    return
  }
  layer.confirm(
    '您将删除所选中的组织机构 [ ' + selectedNode.value.title + ' ] ？',
    {
      title: '提示',
      btn: [
        {
          text: '确定',
          callback: (id: any) => {
            layer.msg('您已成功删除')
            layer.close(id)
          }
        },
        {
          text: '取消',
          callback: (id: any) => {
            layer.msg('您已取消操作')
            layer.close(id)
          }
        }
      ]
    }
  )
}

function toSearch() {
  page.current = 1
  change(page)
}

const loading = ref(false)
const selectedKeys = ref()
const page = reactive({ current: 1, limit: 10, total: 100 })
const columns = ref([
  { title: '选项', width: '55px', type: 'checkbox', fixed: 'left' },
  { title: '编号', width: '80px', key: 'id', fixed: 'left', sort: 'id' },
  { title: '用户账号', width: '80px', key: 'account', sort: 'account' },
  { title: '用户名', width: '80px', key: 'name', sort: 'name' },
  { title: '性别', width: '80px', key: 'sex', sort: 'sex' },
  { title: '角色', width: '120px', key: 'role', customSlot: 'role' },
  {
    title: '创建时间',
    width: '120px',
    key: 'joinTime'
  },
  { title: '状态', width: '120px', key: 'status', sort: 'status' },

  {
    title: '操作',
    width: '150px',
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
    sex: '男',
    role: '管理员',
    account: 'admin',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '2',
    name: '张三2',
    sex: '男',
    role: '普通用户',
    account: '用户2',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '3',
    name: '李四3',
    sex: '男',
    role: '普通用户',
    account: '用户3',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '4',
    name: '用户4',
    sex: '男',
    role: '普通用户',
    account: '用户4',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '5',
    name: '王五5',
    sex: '男',
    role: '普通用户',
    account: '用户5',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '6',
    name: '赵六6',
    sex: '男',
    role: '普通用户',
    account: '用户6',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '7',
    name: '黄齐7',
    sex: '男',
    role: '普通用户',
    account: '用户7',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '8',
    name: '用户8',
    sex: '男',
    role: '普通用户',
    account: '用户8',
    joinTime: '2022-02-09 18:34:56',
    status: true
  },
  {
    id: '9',
    name: '游客9',
    sex: '男',
    role: '游客',
    account: '游客9',
    joinTime: '用户22-02-09 18:34:56',
    status: true
  },
  {
    id: '10',
    name: '用户10',
    sex: '女',
    role: '普通用户',
    account: 'user10',
    joinTime: '2022-02-09 18:34:56 18:34:56',
    status: true
  }
])
const changeStatus = (isChecked: boolean, row: any) => {
  dataSource.value.forEach((item) => {
    if (item.id === row.id) {
      layer.msg('Success', { icon: 1 }, () => {
        item.status = isChecked
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
      account: `user${i}`,
      sex: '男',
      name: `用户${i}`,
      joinTime: '2022-02-09 18:34:56',
      role: '普通用户',
      status: true
    })
  }
  return response
}
const model11 = ref({
  name: '',
  role: '',
  sex: '',
  status: '',
  account: ''
})
const layFormRef11 = ref()
const visible11 = ref(false)
const title = ref('新增')
const changeVisible11 = (text: any, row: any) => {
  title.value = text
  if (row != null) {
    let info = JSON.parse(JSON.stringify(row))
    model11.value = info
  } else {
    model11.value = {
      name: '',
      role: '',
      sex: '',
      status: '',
      account: ''
    }
  }
  visible11.value = !visible11.value
}
const submit11 = function () {
  layFormRef11.value.validate((isValidate: any, model: any, errors: any) => {
    layer.open({
      type: 1,
      title: '表单提交结果',
      content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(
        model
      )} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`,
      shade: false,
      isHtmlFragment: true,
      btn: [
        {
          text: '确认',
          callback(index: any) {
            layer.close(index)
          }
        }
      ],
      area: '500px'
    })
  })
}
// 清除校验
const clearValidate11 = function () {
  layFormRef11.value.clearValidate()
}
// 重置表单
const reset11 = function () {
  layFormRef11.value.reset()
}
function toRemove() {
  if (selectedKeys.value.length == 0) {
    layer.msg('您未选择数据，请先选择要删除的数据', { icon: 3, time: 2000 })
    return
  }
  layer.confirm('您将删除所有选中的数据？', {
    title: '提示',
    btn: [
      {
        text: '确定',
        callback: (id: any) => {
          layer.msg('您已成功删除')
          layer.close(id)
        }
      },
      {
        text: '取消',
        callback: (id: any) => {
          layer.msg('您已取消操作')
          layer.close(id)
        }
      }
    ]
  })
}
function toSubmit() {
  layer.msg('保存成功！', { icon: 1, time: 1000 })
  visible11.value = false
  visible22.value = false
}
function toCancel() {
  visible11.value = false
  visible22.value = false
}
function confirm() {
  layer.msg('您已成功删除')
}
function cancel() {
  layer.msg('您已取消操作')
}

const model22 = ref({
  organization: '',
  name: '',
  fullName: '',
  code: '',
  type: '',
  sort: 0,
  remark: ''
})
const layFormRef22 = ref()
const visible22 = ref(false)
const title22 = ref('新建')
</script>

<style scoped>
.organization-box {
  width: calc(100vw - 240px);
  height: calc(100vh - 110px);
  margin-top: 10px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
}
.left-tree {
  display: inline-block;
  padding: 20px 15px 0 5px;
  height: 1200px;
  border-right: 1px solid #e6e6e6;
  box-sizing: border-box;
  position: relative;
}
/* todo layui-tree-entry 设置无效 */
.layui-tree-entry {
  position: relative;
  padding: 10px 0;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
}
.isFold {
  position: absolute;
  top: 36%;
  right: -10px;
  width: 26px;
  height: 26px;
  line-height: 26px;
  border-radius: 13px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  cursor: pointer;
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
</style>