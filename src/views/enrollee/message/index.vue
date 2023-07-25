<template>
  <lay-tab
    type="brief"
    style="
      background: #fff;
      padding: 20px 0;
      border: 1px solid #eee;
      border-radius: 2px;
      height: 70%;
      margin: 10px;
    "
    v-model="currentTab"
    tabPosition="left"
  >
    <lay-tab-item id="system">
      <template #title>
        系统通知
        <div style="width: 40px; margin-left: 20px; display: inline-block">
          <div v-if="messageInfo.system > 0" class="corner-mark">
            {{ messageInfo.system }}
          </div>
        </div>
      </template>
      <table-content key="system" />
    </lay-tab-item>
    <lay-tab-item id="user">
      <template #title>
        用户私信
        <div style="width: 40px; margin-left: 20px; display: inline-block">
          <div v-if="messageInfo.user > 0" class="corner-mark">
            {{ messageInfo.user }}
          </div>
        </div>
      </template>
      <table-content key="user" />
    </lay-tab-item>
    <lay-tab-item id="todo">
      <template #title>
        待办事项
        <div style="width: 40px; margin-left: 20px; display: inline-block">
          <div v-if="messageInfo.todo > 0" class="corner-mark">
            {{ messageInfo.todo }}
          </div>
        </div>
      </template>
      <table-content key="todo" />
    </lay-tab-item>
  </lay-tab>
</template>
<script lang="ts">
import { ref } from 'vue'
import tableContent from './table.vue'

export default {
  components: {
    tableContent
  },
  setup() {
    const currentTab = ref('system')
    const messageInfo = ref({
      system: 3,
      user: 0,
      todo: 11
    })

    return {
      currentTab,
      messageInfo
    }
  }
}
</script>

<style scoped>
.corner-mark {
  height: 16px;
  display: inline-block;
  padding: 0 5px;
  color: #fff;
  line-height: 16px;
  background-color: #f5222d;
  border-radius: 14px;
}
</style>