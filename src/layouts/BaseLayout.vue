<template>
  <lay-layout :class="[collapseState ? 'collapse' : '']">
    <!-- side -->
    <lay-side :black="isBlack">
      <lay-logo> </lay-logo>
      <lay-menu
        v-model:selectedKey="selectKey"
        v-model:openKeys="openKeys"
        :tree="isTree"
      >
        <lay-sub-menu title="工作空间" id="0">
          <lay-menu-item id="/console"> 控制台 </lay-menu-item>
          <lay-menu-item id="/analysis"> 分析页 </lay-menu-item>
        </lay-sub-menu>
        <lay-sub-menu title="错误页面" id="1">
          <lay-menu-item id="/error/401"> 401 </lay-menu-item>
          <lay-menu-item id="/error/403"> 403 </lay-menu-item>
          <lay-menu-item id="/error/404"> 404 </lay-menu-item>
          <lay-menu-item id="/error/500"> 500 </lay-menu-item>
        </lay-sub-menu>
        <lay-sub-menu title="系统管理" id="2">
          <lay-menu-item id="/system/user"> 用户管理 </lay-menu-item>
          <lay-menu-item id="/system/role"> 角色管理 </lay-menu-item>
        </lay-sub-menu>
        <lay-sub-menu title="结果页面" id="3">
          <lay-menu-item id="/result/success"> 成功页面 </lay-menu-item>
          <lay-menu-item id="/result/failure"> 失败页面 </lay-menu-item>
        </lay-sub-menu>
      </lay-menu>
    </lay-side>
    <lay-layout>
      <!-- header -->
      <lay-header>
        <lay-menu class="layui-layout-left">
          <lay-menu-item @click="collapse">
            <lay-icon
              v-if="collapseState"
              type="layui-icon-spread-left"
            ></lay-icon>
            <lay-icon v-else type="layui-icon-shrink-right"></lay-icon>
          </lay-menu-item>
          <lay-menu-item @click="refresh">
            <lay-icon type="layui-icon-refresh-one"></lay-icon>
          </lay-menu-item>
        </lay-menu>
        <lay-menu class="layui-layout-right">
          <lay-dropdown>
            <lay-menu-item>
              <lay-icon type="layui-icon-notice"></lay-icon>
            </lay-menu-item>
            <template #content>
                内容
            </template>
          </lay-dropdown>
          <lay-dropdown>
            <lay-menu-item>
              <lay-icon type="layui-icon-username"></lay-icon>
            </lay-menu-item>
            <template #content>
              <lay-dropdown-item>用户信息</lay-dropdown-item>
              <lay-dropdown-item>注销登录</lay-dropdown-item>
            </template>
          </lay-dropdown>

          <div style="position: relative;display: inline-block;">
            <lay-menu-item @click="changeVisible">
              <lay-icon type="layui-icon-more-vertical"></lay-icon>
            </lay-menu-item>
          </div>

        </lay-menu>
      </lay-header>
      <!-- content -->
      <lay-body>
        <lay-tab
          :modelValue="route.path"
          @change="change"
          :allowClose="allowClose"
          @close="close"
        >
          <lay-tab-item
            v-for="tab in tabs"
            :key="tab"
            :title="tab.title"
            :id="tab.id"
            :closable="tab.closable"
          ></lay-tab-item>
        </lay-tab>
        <router-view v-if="isRouterAlive"></router-view>
      </lay-body>
      <lay-footer></lay-footer>
    </lay-layout>
  </lay-layout>
  <lay-layer title="更多设置" type="drawer" v-model="visible"></lay-layer>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    // router instance
    const router = useRouter();
    const route = useRoute();

    // const ref
    const isTree = ref(true);
    const isBlack = ref(true);
    const openKeys = ref(["0"]);
    const selectKey = ref(route.path);
    const collapseState = ref(false);
    const isRouterAlive = ref(true);
    const allowClose = ref(true);
    const visible = ref(false);
    const tabs = ref([{ title: "首页", id: "/console", closable: false }]);

    const changeVisible = function() {
      visible.value = !visible.value
    }

    watch(selectKey, () => {
      router.push(selectKey.value);
    });
    
    const change = function (id) {
      selectKey.value = id;

      alert(id);
      router.push(id);
    };

    // 侧边状态
    const collapse = function () {
      collapseState.value = !collapseState.value;
    };

    // 路由刷新
    const refresh = function () {
      isRouterAlive.value = false;
      setTimeout(function () {
        isRouterAlive.value = true;
      }, 500);
    };

    // 关闭当前
    const close = function (path) {
      tabs.value = tabs.value.filter((ele) => ele.id != path);
    };

    // 路由监听
    watch(route, function () {
      let bool = false;
      tabs.value.forEach((tab) => {
        if (tab.id === route.path) {
          bool = true;
        }
      });
      if (!bool) {
        tabs.value.push({ id: route.fullPath, title: route.meta.title });
      }
    });

    // return instance
    return {
      changeVisible,
      isRouterAlive,
      collapseState,
      allowClose,
      selectKey,
      collapse,
      openKeys,
      isBlack,
      visible,
      isTree,
      change,
      close,
      route,
      tabs,
    };
  },
};
</script>
