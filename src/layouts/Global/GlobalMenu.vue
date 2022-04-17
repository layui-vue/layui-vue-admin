<template>
  <lay-menu
    v-model:selectedKey="selectKey"
    v-model:openKeys="openKeys"
    :collapse="collapse"
    :tree="isTree"
    :level="appStore.level"
    :inverted="appStore.inverted"
  >
    <lay-sub-menu id="0">
      <template #icon>
        <lay-icon type="layui-icon-home"></lay-icon>
      </template>
      <template #title> 工作空间 </template>
      <lay-menu-item id="/console">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 工作台 </template>
      </lay-menu-item>
      <lay-menu-item id="/analysis">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 控制台 </template>
      </lay-menu-item>
    </lay-sub-menu>
    <lay-sub-menu id="1">
      <template #icon>
        <lay-icon type="layui-icon-home"></lay-icon>
      </template>
      <template #title> 错误页面 </template>
      <lay-menu-item id="/error/401">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 401 </template>
      </lay-menu-item>
      <lay-menu-item id="/error/403">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 403 </template>
      </lay-menu-item>
      <lay-menu-item id="/error/404">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 404 </template>
      </lay-menu-item>
      <lay-menu-item id="/error/500">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 500 </template>
      </lay-menu-item>
    </lay-sub-menu>
    <lay-sub-menu id="2">
      <template #icon>
        <lay-icon type="layui-icon-home"></lay-icon>
      </template>
      <template #title> 系统管理 </template>
      <lay-menu-item id="/system/user">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 用户管理 </template>
      </lay-menu-item>
      <lay-menu-item id="/system/role">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 角色管理 </template>
      </lay-menu-item>
    </lay-sub-menu>
    <lay-sub-menu id="3">
      <template #icon>
        <lay-icon type="layui-icon-home"></lay-icon>
      </template>
      <template #title> 结果页面 </template>
      <lay-menu-item id="/result/success">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 成功页面 </template>
      </lay-menu-item>
      <lay-menu-item id="/result/failure">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon>
        </template>
        <template #title> 失败页面 </template>
      </lay-menu-item>
    </lay-sub-menu>
  </lay-menu>
</template>

<script lang="ts">
export default {
  name: "GlobalMenu",
};
</script>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useAppStore } from "../../store/app";

const appStore = useAppStore();

interface MenuProps {
  collapse: boolean;
}

const props = withDefaults(defineProps<MenuProps>(), {
  collapse: false,
});

const route = useRoute();
const router = useRouter();
const selectKey = ref(route.path);
const openKeys = ref(["0"]);
const isTree = ref(true);

watch(route, (val) => {
  selectKey.value = route.path;
});

watch(selectKey, (val) => {
  router.push(val);
});
</script>
