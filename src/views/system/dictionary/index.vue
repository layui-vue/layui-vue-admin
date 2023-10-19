<template>
  <lay-container fluid="true" class="dictionary-box">
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
              {{ data.title }}
            </span>
          </template>
        </lay-tree>
        <div class="isFold" @click="isFold = !isFold">
          &nbsp;<lay-icon v-if="!isFold" class="layui-icon-left"></lay-icon>
          <lay-icon v-else class="layui-icon-right"></lay-icon>
        </div>
      </div>
      <div style="flex: 1; padding: 10px; over-flow: auto">
        <lay-table
          :page="page"
          :height="'100%'"
          :columns="columns"
          :loading="loading"
          :default-toolbar="true"
          :data-source="dataSource"
          v-model:selected-keys="selectedKeys"
          @sortChange="sortChange"
        >
          <template #status="{ row }">
            <lay-switch
              :model-value="row.status"
              @change="changeStatus($event, row)"
            ></lay-switch>
          </template>
          <template v-slot:toolbar>
            <lay-input
              v-model="searchQuery.name"
              placeholder="请输入关键字查询"
              size="sm"
              :allow-clear="true"
              style="width: 200px; margin-right: 10px; background: #fff"
            ></lay-input>
            <lay-button type="normal" size="sm" @click="toSearch">
              查询
            </lay-button>
            <lay-button
              size="sm"
              type="primary"
              @click="changeVisible11('新增', null)"
              >新增</lay-button
            >
            <lay-button size="sm" type="danger" @click="toRemove"
              >删除</lay-button
            >
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
              content="确定要删除此字典项吗?"
              @confirm="confirm"
              @cancel="cancel"
            >
              <lay-button border="red" border-style="dashed" size="xs"
                >删除</lay-button
              >
            </lay-popconfirm>
          </template>
        </lay-table>
      </div>
    </div>
    <lay-layer v-model="visible11" :title="title" :area="['700px', '270px']">
      <div style="padding: 20px">
        <lay-form :model="model11" ref="layFormRef11" required>
          <lay-row>
            <lay-col md="12">
              <lay-form-item label="字典项名称" prop="name">
                <lay-input v-model="model11.name"></lay-input>
              </lay-form-item>
              <lay-form-item label="字典项值" prop="nameValue">
                <lay-input v-model="model11.nameValue"></lay-input>
              </lay-form-item>
            </lay-col>
            <lay-col md="12">
              <lay-form-item label="排序" prop="sort">
                <lay-input-number
                  style="width: 100%"
                  v-model="model11.sort"
                  position="right"
                ></lay-input-number>
              </lay-form-item>
              <lay-form-item label="备注" prop="remark">
                <lay-textarea
                  :rows="2"
                  allow-clear
                  placeholder="请输入备注"
                  v-model="model11.remark"
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

    <lay-layer v-model="visible22" :title="title22" :area="['500px', '400px']">
      <div style="padding: 20px">
        <lay-form :model="model22" ref="layFormRef11" required>
          <lay-form-item label="字典名称" prop="name">
            <lay-input v-model="model22.name"></lay-input>
          </lay-form-item>
          <lay-form-item label="字典值" prop="nameValue">
            <lay-input v-model="model22.nameValue"></lay-input>
          </lay-form-item>
          <lay-form-item label="排序" prop="sort">
            <lay-input-number
              style="width: 100%"
              v-model="model22.sort"
              position="right"
            ></lay-input-number>
          </lay-form-item>
          <lay-form-item label="备注" prop="remark">
            <lay-textarea
              :rows="3"
              allow-clear
              placeholder="请输入备注"
              v-model="model22.remark"
            ></lay-textarea>
          </lay-form-item>
        </lay-form>
        <div style="width: 100%; text-align: center; margin-top: 20px">
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
import { ref, reactive, onMounted } from 'vue'
import { layer } from '@layui/layui-vue'
onMounted(() => {
  selectedNode.value = {
    title: '性别',
    id: 1,
    checked: true
  }
  change(page)
})
const data = ref([
  {
    title: '性别',
    id: 1,
    checked: true
  },
  {
    title: '机构类型',
    id: 2,
    checked: false
  }
])
const showLine = ref(false)
const selectedKey = ref('')
const selectedNode = ref({
  id: 0,
  title: '',
  checked: false
})
const isFold = ref(false)
const searchQuery = ref({
  name: ''
})
function toReset() {
  searchQuery.value = {
    name: ''
  }
}
function handleClick(node: any) {
  selectedNode.value = JSON.parse(JSON.stringify(node))
  change(page)
}

function toDelete() {
  if (selectedKey.value == '') {
    layer.msg('您未选择字典，请先选择要删除的字典', {
      icon: 3,
      time: 2000
    })
    return
  }
  layer.confirm(
    '您将删除所选中的字典 [ ' + selectedNode.value.title + ' ] ？',
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

const dataSourceSex = ref([
  {
    id: '1',
    name: '男',
    nameValue: 1,
    sort: 1,
    joinTime: '2022-02-09',
    status: true
  },
  {
    id: '2',
    name: '女',
    nameValue: 2,
    sort: 2,
    joinTime: '2022-02-09',
    status: true
  }
])
const dataSourceOri = ref([
  {
    id: '1',
    name: '公司',
    nameValue: 1,
    sort: 1,
    joinTime: '2022-02-09'
  },
  {
    id: '2',
    name: '子公司',
    nameValue: 2,
    sort: 2,
    joinTime: '2022-02-09',
    status: true
  },
  {
    id: '3',
    name: '部门',
    nameValue: 3,
    sort: 3,
    joinTime: '2022-02-09',
    status: true
  },
  {
    id: '4',
    name: '小组',
    nameValue: 4,
    sort: 4,
    joinTime: '2022-02-09',
    status: true
  }
])
const dataSource = ref()
const loading = ref(false)
const selectedKeys = ref()
const page = reactive({ current: 1, limit: 10, total: 2 })
const columns = ref([
  { title: '选项', width: '55px', type: 'checkbox', fixed: 'left' },
  { title: '字典项名称', key: 'name', sort: 'desc' },
  { title: '字典项值', key: 'nameValue', sort: 'desc' },
  { title: '排序', key: 'sort', sort: 'desc' },
  { title: '时间', width: '120px', key: 'joinTime', sort: 'desc' },
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
    if (selectedNode.value.id == 1) {
      page.total = dataSourceSex.value.length
    } else if (selectedNode.value.id == 2) {
      page.total = dataSourceOri.value.length
    }
    loading.value = false
  }, 1000)
}
const sortChange = (key: any, sort: number) => {
  layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
}

const changeStatus = (isChecked: boolean, row: any) => {
  dataSourceSex.value.forEach((item) => {
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

const model11 = ref({
  name: '',
  nameValue: '',
  sort: 0,
  remark: ''
})
const layFormRef11 = ref()
const visible11 = ref(false)
const title = ref('新增')
const changeVisible11 = (text: any, row: any) => {
  title.value = text
  if (row) {
    let info = JSON.parse(JSON.stringify(row))
    model11.value = info
  } else {
    model11.value = {
      name: '',
      nameValue: '',
      sort: 0,
      remark: ''
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
          callback(index: number) {
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
    layer.msg('您未选择数据，请先选择要删除的字典项', { icon: 3, time: 2000 })
    return
  }
  layer.confirm('您将删除所有选中的字典项？', {
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

function toAdd() {
  visible22.value = true
}
function toEdit() {
  if (selectedNode.value.id == 2) {
    title22.value = '修改字典'
    model22.value = {
      name: '组织机构',
      nameValue: 'organization_type',
      sort: 2,
      remark: '备注'
    }
    visible22.value = true
  } else {
    title22.value = '新建字典'
    model22.value = {
      name: '性别',
      nameValue: 'sex',
      sort: 1,
      remark: '备注'
    }
    visible22.value = true
  }
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
  name: '',
  nameValue: '',
  sort: 0,
  remark: ''
})
const layFormRef22 = ref()
const visible22 = ref(false)
const title22 = ref('新建字典')
</script>

<style scoped>
.dictionary-box {
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