<template>
  <lay-container fluid="true" style="padding: 10px">
    <lay-row :space="10">
      <lay-col :md="24">
        <lay-card>
          <lay-form style="margin-top: 20px">
            <lay-row>
              <lay-col :md="6">
                <lay-form-item label="账号：" label-width="50">
                  <lay-input
                    v-model="searchAccount"
                    style="width: 90%"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col :md="6">
                <lay-form-item label="邮箱：" label-width="50">
                  <lay-input
                    v-model="searchEmail"
                    style="width: 90%"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col :md="6">
                <lay-form-item label-width="0">
                  <lay-button type="primary" @click="toSearch">查询</lay-button>
                  <lay-button @click="toReset">重置</lay-button>
                </lay-form-item>
              </lay-col>
            </lay-row>
          </lay-form>
        </lay-card>
      </lay-col>
      <lay-col :md="24">
        <lay-card>
          <lay-table
            :page="page"
            :columns="columns"
            :dataSource="dataSource"
            :default-toolbar="defaultToolbar"
            v-model:selectedKeys="selectedKeys"
            @row="rowClick"
            @change="change"
          >
            <template v-slot:toolbar>
              <lay-button size="sm" type="primary">新增</lay-button>
              <lay-button size="sm">删除</lay-button>
            </template>
            <template v-slot:username="{ data }">
              {{ data.username }}
            </template>
            <template v-slot:password="{ data }">
              {{ data.password }}
            </template>
            <template v-slot:operator="{}">
              <lay-button size="xs" type="primary">修改</lay-button>
              <lay-button size="xs">删除</lay-button>
            </template>
            <template v-slot:footer>
              {{ selectedKeys }}
            </template>
          </lay-table>
        </lay-card>
      </lay-col>
    </lay-row>
  </lay-container>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { layer } from '@layui/layer-vue'

export default {
  setup() {
    const selectedKeys = ref(['1'])
    const checkbox = ref(true)
    const defaultToolbar = ref(true)
    const page = ref({ total: 100, limit: 10, current: 2 })

    const columns = [
      {
        title: '复选',
        width: '50px',
        type: 'checkbox',
        fixed: 'left'
      },
      {
        title: '账户',
        width: '200px',
        customSlot: 'username',
        key: 'username'
      },
      {
        title: '密码',
        width: '180px',
        customSlot: 'password',
        key: 'password'
      },
      {
        title: '年龄',
        width: '180px',
        key: 'age'
      },
      {
        title: '描述',
        key: 'remark',
        ellipsisTooltip: true
      },
      {
        title: '操作',
        width: '180px',
        customSlot: 'operator',
        key: 'operator',
        fixed: 'right'
      }
    ]

    const dataSource = [
      {
        id: '1',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '2',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '3',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '4',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '5',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '6',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '7',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '8',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '9',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '10',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      },
      {
        id: '11',
        username: 'shana',
        password: '夏娜',
        remark: '花开堪折直须折,莫待无花空折枝',
        age: '22'
      }
    ]

    const rowClick = function (data: any) {}

    const rowDoubleClick = function (data: any) {}

    const change = function ({ current, limit }: any) {
      layer.msg('current:' + current + ' limit:' + limit)
    }
    function toSearch() {
      layer.load(2, { time: 3000 })
    }
    const searchAccount = ref('')
    const searchEmail = ref('')
    function toReset() {
      searchAccount.value = ''
      searchEmail.value = ''
    }

    return {
      columns,
      dataSource,
      selectedKeys,
      checkbox,
      defaultToolbar,
      page,
      rowClick,
      rowDoubleClick,
      change,
      toReset,
      toSearch,
      searchAccount,
      searchEmail
    }
  }
}
</script>
