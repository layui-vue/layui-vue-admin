<template>
  <lay-config-provider :themeVariable="themeVariable" :theme="theme">
    <lay-layout :class="[collapseState ? 'collapse' : '']">
      <!-- side -->
      <lay-side :black="isBlack">
        <lay-logo></lay-logo>
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
            <li class="layui-nav-item">
              <a href="javascript:void(0)">
                <lay-switch
                  class="switch"
                  v-model="isDark"
                  onswitch-color="rgba(255, 255, 255, 0.05)"
                  unswitch-color="rgba(255, 255, 255, 0.05)"
                >
                  <template #onswitch-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="rgba(60, 60, 60, .7)"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 24 24"
                      class="vt-switch-appearance-moon"
                    >
                      <path
                        d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
                      ></path>
                    </svg>
                  </template>
                  <template #unswitch-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="rgba(60, 60, 60, .7)"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 24 24"
                      class="vt-switch-appearance-sun"
                    >
                      <path
                        d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
                      ></path>
                      <path
                        d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"
                      ></path>
                      <path
                        d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"
                      ></path>
                      <path
                        d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
                      ></path>
                      <path
                        d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
                      ></path>
                      <path
                        d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"
                      ></path>
                      <path
                        d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                      ></path>
                      <path
                        d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
                      ></path>
                      <path
                        d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
                      ></path>
                    </svg>
                  </template>
                </lay-switch>
              </a>
            </li>
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
                <lay-dropdown-menu>
                  <lay-dropdown-menu-item>用户信息</lay-dropdown-menu-item>
                  <lay-dropdown-menu-item>注销登录</lay-dropdown-menu-item>
                </lay-dropdown-menu>
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
            v-if="appStore.tab"
            :modelValue="route.path"
            @change="change"
            :allowClose="allowClose"
            @close="close"
          >
            <template :key="tab" v-for="tab in tabs">
              <lay-tab-item
                :id="tab.id"
                :title="tab.title"
                :closable="tab.closable"
              ></lay-tab-item>
            </template>
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
import { useAppStore } from "../store/app";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();

    const isTree = ref(true);
    const isBlack = ref(true);
    const openKeys = ref(["0"]);
    const selectKey = ref(route.path);
    const collapseState = ref(false);
    const isRouterAlive = ref(true);
    const allowClose = ref(true);
    const visible = ref(false);
    const theme = ref("light");
    const isDark = ref(false);
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

    watch(isDark, () => {
      if (isDark.value) {
        theme.value = "dark";
      } else {
        theme.value = "light";
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
      appStore,
      openKeys,
      refresh,
      isBlack,
      visible,
      isTree,
      isDark,
      change,
      theme,
      close,
      route,
      tabs,
    };
  },
};
</script>

<style>
.layui-layout .layui-header .layui-form-switch {
  border: 1px solid rgba(60, 60, 60, 0.29);
  background-color: #f1f1f1 !important;
  margin-top: -8px;
}
.layui-layout .layui-header .layui-form-switch svg {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 3px;
  left: 3px;
}
</style>