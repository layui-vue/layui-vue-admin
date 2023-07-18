<template>
  <lay-container fluid="true" class="menu-box">
    <lay-card>
      <lay-form style="margin-top: 10px">
        <lay-row>
          <lay-col :md="5">
            <lay-form-item label="菜单名称" label-width="80">
              <lay-input
                v-model="searchQuery.name"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="菜单地址" label-width="80">
              <lay-input
                v-model="searchQuery.address"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="权限标识" label-width="80">
              <lay-input
                v-model="searchQuery.identifying"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
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
    <!-- table -->
    <div class="table-box">
      <lay-table
        ref="tableRef6"
        :loading="loading"
        children-column-name="children"
        :columns="columns6"
        :data-source="dataSource6"
        :default-toolbar="true"
        :default-expand-all="defaultExpandAll6"
        :expand-index="1"
      >
        <template #toolbar>
          <lay-button type="primary" size="sm" @click="getCheckData6"
            >获取选中数据</lay-button
          >
          <lay-button size="sm" @click="changeVisible11('新建')">
            新建
          </lay-button>
          <lay-button size="sm" @click="expandAll6(true)">展开全部</lay-button>
          <lay-button size="sm" @click="expandAll6(false)">折叠全部</lay-button>
        </template>
      </lay-table>
    </div>

    <lay-layer v-model="visible11" :title="title" :area="['600px', '450px']">
      <div style="padding: 20px">
        <lay-form :model="model11" ref="layFormRef11" required>
          <lay-form-item label="姓名" prop="name">
            <lay-input v-model="model11.name"></lay-input>
          </lay-form-item>
          <lay-form-item label="年龄" prop="age">
            <lay-input v-model="model11.age"></lay-input>
          </lay-form-item>
          <lay-form-item label="性别" prop="sex">
            <lay-select v-model="model11.sex" style="width: 100%">
              <lay-select-option value="男" label="男"></lay-select-option>
              <lay-select-option value="女" label="女"></lay-select-option>
            </lay-select>
          </lay-form-item>
          <lay-form-item label="城市" prop="city">
            <lay-input v-model="model11.city"></lay-input>
          </lay-form-item>
          <lay-form-item label="email" prop="email">
            <lay-input v-model="model11.email"></lay-input>
          </lay-form-item>
          <lay-form-item label="描述" prop="remark">
            <lay-textarea
              placeholder="请输入描述"
              v-model="model11.remark"
            ></lay-textarea>
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

    <lay-layer v-model="visible22" title="分配权限" :area="['600px', '450px']">
      <div style="height: 320px; overflow: auto">
        <lay-tree
          style="margin-left: 40px"
          :tail-node-icon="false"
          :data="data2"
          :showCheckbox="showCheckbox2"
          v-model:checkedKeys="checkedKeys2"
        >
          <template #title="{ data }">
            <lay-icon :class="data.icon"></lay-icon>
            {{ data.title }}
          </template>
        </lay-tree>
      </div>
      <lay-line></lay-line>
      <div style="width: 90%; text-align: right">
        <lay-button size="sm" type="primary" @click="toSubmit">保存</lay-button>
        <lay-button size="sm" @click="toCancel">取消</lay-button>
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
  sex: ''
})

function toReset() {
  searchQuery.value = {
    userAccount: '',
    userName: '',
    sex: ''
  }
}

function toSearch() {
  page.current = 1
  change(page)
}
const change = (page: any) => {
  loading.value = true
  setTimeout(() => {
    //
    loading.value = false
  }, 1000)
}
const page = reactive({ current: 1, limit: 10, total: 100 })
const loading = ref(false)
const tableRef6 = ref()

const columns6 = [
  {
    fixed: 'left',
    type: 'checkbox',
    title: '复选'
  },

  {
    title: '名称',
    width: '200px',
    key: 'name'
  },
  {
    title: '性别',
    width: '100px',
    key: 'sex'
  },
  {
    title: '城市',
    width: '120px',
    key: 'city'
  },
  {
    title: '签到',
    width: '100px',
    key: 'sign'
  },
  {
    title: '签名',
    width: '240px',
    key: 'remark'
  }
]

const dataSource6 = [
  {
    id: '10001',
    name: '张三 1',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10009',
        name: '张三 1-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。',
        children: [
          {
            id: '10010',
            name: '张三 1-1-1',
            sex: '男',
            age: 22,
            city: '浙江杭州',
            sign: '已签到',
            remark: '人生若只如初见，何事秋风悲画扇。',
            children: [
              {
                id: '10029',
                name: '张三 1-1-1-1',
                sex: '男',
                age: 22,
                city: '浙江杭州',
                sign: '已签到',
                remark: '人生若只如初见，何事秋风悲画扇。'
              },
              {
                id: '10030',
                name: '张三 1-1-1-2',
                sex: '男',
                age: 22,
                city: '浙江杭州',
                sign: '已签到',
                remark: '人生若只如初见，何事秋风悲画扇。'
              }
            ]
          },
          {
            id: '10011',
            name: '张三 1-1-2',
            sex: '男',
            age: 22,
            city: '浙江杭州',
            sign: '已签到',
            remark: '人生若只如初见，何事秋风悲画扇。',
            children: [
              {
                id: '10031',
                name: '张三 1-1-2-1',
                sex: '男',
                age: 22,
                city: '浙江杭州',
                sign: '已签到',
                remark: '人生若只如初见，何事秋风悲画扇。'
              },
              {
                id: '10032',
                name: '张三 1-1-2-2',
                sex: '男',
                age: 22,
                city: '浙江杭州',
                sign: '已签到',
                remark: '人生若只如初见，何事秋风悲画扇。'
              }
            ]
          }
        ]
      },
      {
        id: '10012',
        name: '张三 1-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。',
        children: [
          {
            id: '10013',
            name: '张三 1-2-1',
            sex: '男',
            age: 22,
            city: '浙江杭州',
            sign: '已签到',
            remark: '人生若只如初见，何事秋风悲画扇。'
          },
          {
            id: '10014',
            name: '张三 1-2-2',
            sex: '男',
            age: 22,
            city: '浙江杭州',
            sign: '已签到',
            remark: '人生若只如初见，何事秋风悲画扇。'
          }
        ]
      }
    ]
  },
  {
    id: '10002',
    name: '张三 2',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10015',
        name: '张三 2-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10016',
        name: '张三 2-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  },
  {
    id: '10003',
    name: '张三 3',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10017',
        name: '张三 3-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10018',
        name: '张三 3-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  },
  {
    id: '10004',
    name: '张三 4',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10019',
        name: '张三 4-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10020',
        name: '张三 4-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  },
  {
    id: '10005',
    name: '张三 5',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10021',
        name: '张三 5-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10022',
        name: '张三 5-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  },
  {
    id: '10006',
    name: '张三 6',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10023',
        name: '张三 6-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10024',
        name: '张三 6-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  },
  {
    id: '10007',
    name: '张三 7',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10025',
        name: '张三 7-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10026',
        name: '张三 7-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  },
  {
    id: '10008',
    name: '张三 8',
    sex: '男',
    age: 22,
    city: '浙江杭州',
    sign: '已签到',
    remark: '人生若只如初见，何事秋风悲画扇。',
    children: [
      {
        id: '10027',
        name: '张三 8-1',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      },
      {
        id: '10028',
        name: '张三 8-2',
        sex: '男',
        age: 22,
        city: '浙江杭州',
        sign: '已签到',
        remark: '人生若只如初见，何事秋风悲画扇。'
      }
    ]
  }
]

const getCheckData6 = function () {
  layer.msg(tableRef6.value.getCheckData())
}

const defaultExpandAll6 = ref(false)

const expandAll6 = function (flag: any) {
  defaultExpandAll6.value = flag
}
const model11 = ref({})
const layFormRef11 = ref()
const visible11 = ref(false)

const title = ref('新增')
const changeVisible11 = (text: any, row: any) => {
  title.value = text
  if (row) {
    let info = JSON.parse(JSON.stringify(row))
    model11.value = info
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
          callback(index) {
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

const visible22 = ref(false)
const checkedKeys2 = ref([])
const showCheckbox2 = ref(true)

const data2 = ref([
  {
    icon: 'layui-icon-home',

    title: '工作空间',
    id: 1,
    checked: true,
    spread: true,
    children: [
      {
        title: '工作台',
        icon: 'layui-icon-util',
        id: 3
      },
      {
        title: '控制台',
        icon: 'layui-icon-engine',
        id: 4,
        spread: true
      },
      {
        title: '分析页',
        id: 20,
        icon: 'layui-icon-chart-screen'
      },
      {
        title: '监控页',
        id: 21,
        icon: 'layui-icon-find-fill'
      }
    ]
  },
  {
    title: '表单页面',
    icon: 'layui-icon-table',
    id: 2,
    spread: true,
    children: [
      {
        title: '基础表单',
        icon: 'layui-icon-form',
        id: 5,
        spread: true
      },
      {
        title: '复杂表单',
        icon: 'layui-icon-form',
        id: 6
      }
    ]
  },
  {
    title: '个人中心',
    icon: 'layui-icon-slider',
    id: 16,
    children: [
      {
        icon: 'layui-icon-username',
        title: '我的资料',
        id: 17,
        fixed: true
      },
      {
        title: '我的消息',
        icon: 'layui-icon-email',
        id: 27
      }
    ]
  },
  {
    title: '系统管理',
    icon: 'layui-icon-set',
    id: 19,
    children: [
      {
        icon: 'layui-icon-user',
        title: '用户管理',
        id: 25,
        fixed: true
      },
      {
        title: '角色管理',
        icon: 'layui-icon-group',
        id: 29
      },
      {
        title: '机构管理',
        icon: 'layui-icon-transfer',
        id: 29
      }
    ]
  }
])

function toPrivileges() {
  visible22.value = true
}
</script>

<style scoped>
.menu-box {
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
</style>