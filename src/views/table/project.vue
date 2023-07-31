<template>
  <lay-container :fluid="true" style="padding: 10px">
    <lay-row :space="10">
      <lay-col :md="24">
        <lay-card>
          <lay-form style="margin-top: 20px">
            <lay-row>
              <lay-col :md="4">
                <lay-form-item :label-width="0">
                  <lay-input
                    v-model="searchTitle"
                    style="width: 100%"
                  ></lay-input>
                </lay-form-item>
              </lay-col>
              <lay-col :md="6">
                <lay-form-item label-width="0">
                  <lay-button
                    type="primary"
                    style="margin-left: 10px"
                    @click="toSearch"
                    >查询</lay-button
                  >
                  <lay-button @click="toReset">重置</lay-button>
                </lay-form-item>
              </lay-col>
            </lay-row>
          </lay-form>
        </lay-card>
      </lay-col>
      <lay-col :md="24">
        <!-- <lay-card> -->
        <lay-row :space="10">
          <lay-col :md="6" v-for="(item, index) in dataSource" :key="index">
            <lay-card class="card-list-item">
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png"
              />
              <div class="button-list">
                <div class="title">layui-vue</div>
                <div class="content">
                  layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件
                  库
                </div>
                <div class="time-avater">
                  12小时前
                  <div style="flex: 1; text-align: right">
                    <lay-avatar-list>
                      <lay-tooltip
                        :visible="visible"
                        trigger="click"
                        content="假装这里有文字提示"
                      >
                        <lay-avatar :src="src" size="sm" radius></lay-avatar>
                      </lay-tooltip>
                      <lay-tooltip
                        :visible="visible"
                        trigger="click"
                        content="假装这里有文字提示"
                      >
                        <lay-avatar :src="src" size="sm" radius></lay-avatar>
                      </lay-tooltip>
                      <lay-tooltip
                        :visible="visible"
                        trigger="click"
                        content="假装这里有文字提示"
                      >
                        <lay-avatar :src="src" size="sm" radius></lay-avatar>
                      </lay-tooltip>
                    </lay-avatar-list>
                  </div>
                </div>
              </div>
            </lay-card>
          </lay-col>
        </lay-row>
        <lay-page
          v-model="page.current"
          :total="page.total"
          :limit="page.limit"
          :showPage="true"
        >
        </lay-page>
        <!-- </lay-card> -->
      </lay-col>
    </lay-row>
  </lay-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import { layer } from '@layui/layer-vue'

export default {
  setup() {
    const page = ref({ total: 100, limit: 10, current: 2 })

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
      }
    ]
    const src = ref(
      'https://foruda.gitee.com/avatar/1677022544584087390/4835367_jmysy_1578975358.png'
    )
    const visible = ref(false)
    const searchTitle = ref('')
    function toSearch() {
      layer.load(2, { time: 3000 })
    }
    function toReset() {
      searchTitle.value = ''
    }
    return {
      dataSource,
      page,
      src,
      visible,
      searchTitle,
      toSearch,
      toReset
    }
  }
}
</script>

<style scoped>
:deep(.card-list-item .layui-card-body img) {
  width: 100%;
}

:deep(.card-list-item .layui-card-body) {
  padding: 0px !important;
}
.layui-card:last-child {
  border-radius: 4px;
}
.button-list {
  height: 140px;
  padding: 10px;
}

.title {
  font-size: 18px;
  color: #000000e0;
  margin: 15px 0px 5px;
}
.content {
  font-size: 14px;
  color: #ccc;
}
.time-avater {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #ccc;
  margin-top: 15px;
}
.card-list-item:hover {
  box-shadow: 2px 2px 14px #ccc;
  cursor: pointer;
}
</style>
