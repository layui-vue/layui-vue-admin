<template>
  <div style="height: 100%; width: 100%">
    <div style="height: calc(100% - 60px); width: 100%; overflow: auto">
      <lay-card style="margin: 10px">
        <p class="title">复杂表单</p>
        <p class="describe">复杂表单常见于一次性输入和提交大批量数据的场景。</p>
      </lay-card>
      <lay-container
        :fluid="true"
        style="padding: 10px; padding-top: 0px; position: relative"
      >
        <lay-form :model="formData" ref="layFormRef" required>
          <lay-card title="基本信息">
            <lay-row>
              <lay-col md="8">
                <lay-form-item label="名称" prop="name">
                  <lay-input
                    placeholder="请输入名称"
                    v-model="formData.name"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="域名" prop="domain">
                  <lay-input
                    placeholder="请输入域名"
                    v-model="formData.domain"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="管理员" prop="admin">
                  <lay-select v-model="formData.admin">
                    <lay-select-option
                      value="1"
                      label="张三"
                    ></lay-select-option>
                    <lay-select-option
                      value="2"
                      label="李四"
                    ></lay-select-option>
                    <lay-select-option
                      value="3"
                      label="王五"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="审批人" prop="approver">
                  <lay-select v-model="formData.approver">
                    <lay-select-option
                      value="1"
                      label="张三"
                    ></lay-select-option>
                    <lay-select-option
                      value="2"
                      label="李四"
                    ></lay-select-option>
                    <lay-select-option
                      value="3"
                      label="王五"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="生效日期" prop="effectiveDate">
                  <lay-date-picker
                    v-model="formData.effectiveDate"
                    style="width: 100%"
                    range
                    placeholder="type : date"
                  ></lay-date-picker>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="仓库类型" prop="type">
                  <lay-select v-model="formData.type">
                    <lay-select-option
                      value="1"
                      label="类型1"
                    ></lay-select-option>
                    <lay-select-option
                      value="2"
                      label="类型2"
                    ></lay-select-option>
                    <lay-select-option
                      value="3"
                      label="类型3"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
              </lay-col>
            </lay-row>
          </lay-card>

          <lay-card title="附加信息">
            <lay-row>
              <lay-col md="8">
                <lay-form-item label="名称" prop="taskName">
                  <lay-input
                    placeholder="请输入名称"
                    v-model="formData.taskName"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="表述" prop="description">
                  <lay-input
                    placeholder="请输入表述"
                    v-model="formData.description"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="执行人" prop="admin">
                  <lay-select v-model="formData.executor">
                    <lay-select-option
                      value="1"
                      label="张三"
                    ></lay-select-option>
                    <lay-select-option
                      value="2"
                      label="李四"
                    ></lay-select-option>
                    <lay-select-option
                      value="3"
                      label="王五"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="负责人" prop="principal">
                  <lay-select v-model="formData.principal">
                    <lay-select-option
                      value="1"
                      label="张三"
                    ></lay-select-option>
                    <lay-select-option
                      value="2"
                      label="李四"
                    ></lay-select-option>
                    <lay-select-option
                      value="3"
                      label="王五"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="提醒时间" prop="remindTime">
                  <lay-date-picker
                    type="time"
                    v-model="formData.remindTime"
                  ></lay-date-picker>
                </lay-form-item>
              </lay-col>
              <lay-col md="8">
                <lay-form-item label="类型" prop="taskType">
                  <lay-select v-model="formData.taskType">
                    <lay-select-option
                      value="1"
                      label="类型1"
                    ></lay-select-option>
                    <lay-select-option
                      value="2"
                      label="类型2"
                    ></lay-select-option>
                    <lay-select-option
                      value="3"
                      label="类型3"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
              </lay-col>
            </lay-row>
          </lay-card>
        </lay-form>

        <br />

        <lay-card title="货品列表">
          <lay-table :columns="columns" :data-source="tableData">
            <template #name="{ data }">
              <lay-input
                v-if="data.isEdit"
                :model-value="data.name"
                @input="changeData($event, data, 'name')"
              ></lay-input>
              <span v-else>
                {{ data.name }}
              </span>
            </template>
            <template #description="{ data }">
              <lay-input
                v-if="data.isEdit"
                :model-value="data.description"
                @input="changeData($event, data, 'description')"
              ></lay-input>
              <span v-else>
                {{ data.description }}
              </span>
            </template>
            <template #weight="{ data }">
              <lay-input
                v-if="data.isEdit"
                :model-value="data.weight"
                @input="changeData($event, data, 'weight')"
              ></lay-input>
              <span v-else>
                {{ data.weight }}
              </span>
            </template>
            <template #remark="{ data }">
              <lay-input
                v-if="data.isEdit"
                :model-value="data.remark"
                @input="changeData($event, data, 'remark')"
              ></lay-input>
              <span v-else>
                {{ data.remark }}
              </span>
            </template>
            <template #operate="{ data }">
              <lay-button
                type="primary"
                size="xs"
                v-if="!data.isEdit"
                @click="editHandle(data)"
              >
                编辑
              </lay-button>
              <lay-button
                type="primary"
                size="xs"
                v-if="data.isEdit"
                @click="saveTable(data)"
              >
                保存
              </lay-button>
              <lay-button type="danger" size="xs" @click="deleteHandler(data)">
                删除
              </lay-button>
            </template>
          </lay-table>
          <lay-button
            border="green"
            border-style="dashed"
            :fluid="true"
            @click="addHandler"
            style="margin-top: 10px"
            >新增</lay-button
          >
        </lay-card>
      </lay-container>
    </div>
    <div class="footer">
      <div class="footer-button">
        <lay-button type="primary" @click="submitForm">提交</lay-button>
        <lay-button>重置</lay-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, reactive } from 'vue'
import { layer } from '@layui/layer-vue'

export default {
  name: 'Intricate',
  setup() {
    // 表格列
    const columns = [
      {
        title: '名称',
        width: '200px',
        key: 'name',
        customSlot: 'name'
      },
      {
        title: '描述',
        key: 'description',
        customSlot: 'description'
      },
      {
        title: '重量',
        key: 'weight',
        width: '100px',
        customSlot: 'weight'
      },
      {
        title: '备注',
        key: 'remark',
        ellipsisTooltip: true,
        customSlot: 'remark'
      },
      {
        title: '操作',
        width: '180px',
        key: 'operate',
        customSlot: 'operate',
        ellipsisTooltip: true
      }
    ]

    // 表格数据
    const tableData = ref([
      {
        id: '1',
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      },
      {
        id: '2',
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      },
      {
        id: '3',
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      },
      {
        id: '4',
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      },
      {
        id: '5',
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      },
      {
        id: '6',
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      }
    ])

    // 编辑表格
    const editHandle = (data: any) => {
      data.isEdit = true
    }

    // 保存表格编辑
    const saveTable = (data: any) => {
      data.isEdit = false
    }

    // 表格编辑的输入事件
    const changeData = (val: any, data: any, key: string) => {
      data[key] = val
    }

    // 删除行逻辑
    const deleteHandler = (data: any) => {
      layer.confirm('确定删除此条数据？', {
        btn: [
          {
            text: '确定',
            callback: () => {
              tableData.value.forEach((item, index) => {
                if (item.id === data.id) {
                  tableData.value.splice(index, 1)
                }
              })
              layer.closeAll()
            }
          },
          {
            text: '取消',
            callback: () => {
              layer.closeAll()
            }
          }
        ]
      })
    }

    // 新增行逻辑
    const addHandler = () => {
      tableData.value.push({
        id: (tableData.value.length + 1).toString(),
        name: 'layui',
        description: 'layui',
        weight: '∞',
        remark: 'layui - vue（谐音：类 UI) '
      })
    }

    // 表单数据
    const formData = ref({
      name: '',
      domain: '',
      admin: '',
      approver: '',
      effectiveDate: ['2022-09-25', '2022-10-25'],
      type: '',
      taskName: '',
      description: '',
      executor: '',
      principal: '',
      remindTime: '01:01:01',
      taskType: ''
    })

    // 校验数据
    const layFormRef = ref()
    const submitForm = () => {
      layFormRef.value.validate(
        (isValidate: boolean, model: any, errors: any) => {
          if (isValidate) {
            let id = layer.load(1)
            setTimeout(() => {
              layer.close(id)
              layer.msg('提交成功', { icon: 1, time: 1000 })
              formData.value = {
                name: '',
                domain: '',
                admin: '',
                approver: '',
                effectiveDate: ['2022-09-25', '2022-10-25'],
                type: '',
                taskName: '',
                description: '',
                executor: '',
                principal: '',
                remindTime: '01:01:01',
                taskType: ''
              }
              setTimeout(() => {
                layFormRef.value.clearValidate()
              }, 200)
            }, 2000)
          } else {
          }
        }
      )
    }
    return {
      saveTable,
      tableData,
      editHandle,
      columns,
      changeData,
      formData,
      submitForm,
      layFormRef,
      deleteHandler,
      addHandler
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  margin-top: 12px;
}

.describe {
  font-size: 14px;
  margin-bottom: 12px;
}
.footer {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-top: 1px solid whitesmoke;
  line-height: 60px;
  height: 60px;
  .footer-button {
    right: 10px;
    position: absolute;
  }
}
</style>
