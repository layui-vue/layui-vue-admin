<template>
  <lay-config-provider :themeVariable="themeVariable">
    <lay-layout :class="[collapseState ? 'collapse' : '']">
      <!-- side -->
      <lay-side :black="isBlack">
        <lay-logo>
            <img src="https://portrait.gitee.com/uploads/avatars/namespace/2849/8547475_layui-vue_1645856954.png" />
        </lay-logo>
        <LayScroll scrollColor="transparent" style="height: calc(100% - 62px)">
          <lay-menu
            v-model:selectedKey="selectKey"
            v-model:openKeys="openKeys"
            :collapse="collapseState"
            :tree="isTree"
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
        </LayScroll>
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
              <template #content> 内容 </template>
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

            <div style="position: relative; display: inline-block">
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
    <lay-layer title="更多设置" type="drawer" area="360px" v-model="visible">
      <lay-color-picker
        v-model="themeVariable['--global-primary-color']"
      ></lay-color-picker>
      <lay-color-picker
        v-model="themeVariable['--global-normal-color']"
      ></lay-color-picker>
      <lay-color-picker
        v-model="themeVariable['--global-warm-color']"
      ></lay-color-picker>
      <lay-color-picker
        v-model="themeVariable['--global-danger-color']"
      ></lay-color-picker>
      <lay-color-picker
        v-model="themeVariable['--global-checked-color']"
      ></lay-color-picker>
    </lay-layer>
  </lay-config-provider>
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

    const changeVisible = function () {
      visible.value = !visible.value;
    };

    watch(selectKey, () => {
      router.push(selectKey.value);
    });

    const change = function (id) {
      selectKey.value = id;
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

    const themeVariable = ref({
      "--global-primary-color": "#009688",
      "--global-normal-color": "#1e9fff",
      "--global-warm-color": "#ffb800",
      "--global-danger-color": "#ff5722",
      "--global-checked-color": "#5fb878",
    });

    // return instance
    return {
      changeVisible,
      isRouterAlive,
      collapseState,
      themeVariable,
      allowClose,
      selectKey,
      collapse,
      openKeys,
      refresh,
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