<template>
  <lay-container fluid="true" style="padding: 10px">
    <lay-row space="10">
      <lay-col span="24">
        <lay-card>
          <lay-table
            :columns="columns"
            id="id"
            :dataSource="dataSource"
            v-model:selectedKeys="selectedKeys"
            :checkbox="checkbox"
            :default-toolbar="defaultToolbar"
            @row="rowClick"
          >
            <template v-slot:toolbar>
              <lay-button size="sm">新增</lay-button>
              <lay-button size="sm">删除</lay-button>
            </template>
            <template v-slot:username="{ data }">
              {{ data.username }}
            </template>
            <template v-slot:password="{ data }">
              {{ data.password }}
            </template>
            <template v-slot:operator="{ }">
              <lay-button size="xs">修改</lay-button>
              <lay-button size="xs" type="primary">删除</lay-button>
            </template>
          </lay-table>
        </lay-card>
      </lay-col>
    </lay-row>
  </lay-container>
</template>

<script lang="ts">
import { ref, watch } from "vue";

export default {
  setup() {
    const selectedKeys = ref(["1"]);
    const checkbox = ref(true);
    const defaultToolbar = ref(true);

    const columns = [
      {
        title: "账户",
        width: "200px",
        customSlot: "username",
        key: "username",
      },
      {
        title: "密码",
        width: "180px",
        customSlot: "password",
        key: "password",
      },
      {
        title: "年龄",
        width: "180px",
        key: "age",
      },
      {
        title: "操作",
        width: "180px",
        customSlot: "operator",
        key: "operator",
      },
    ];

    const dataSource = [
      { id: "1", username: "root", password: "root", age: "18" },
      { id: "2", username: "woow", password: "woow", age: "20" },
    ];

    const rowClick = function (data: any) {
      console.log(JSON.stringify(data));
    };

    const rowDoubleClick = function (data: any) {
      console.log(JSON.stringify(data));
    };

    watch(selectedKeys, () => {
      console.log("打印")
    })

    return {
      columns,
      dataSource,
      selectedKeys,
      checkbox,
      defaultToolbar,
      rowClick,
      rowDoubleClick,
    };
  },
};
</script>
