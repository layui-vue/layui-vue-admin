<template>
  <lay-config-provider :themeVariable="appStore.themeVariable" :theme="appStore.theme">
    <lay-layout :class="[collapseState ? 'collapse' : '']">
      <!-- side -->
      <lay-side>
        <lay-logo></lay-logo>
        <lay-scroll scrollColor="transparent" style="height: calc(100% - 62px)">
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
        </lay-scroll>
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
                  v-model="appStore.theme"
                  onswitch-value = "dark"
                  unswitch-value = "light"
                  onswitch-color="rgba(255, 255, 255, 0.05)"
                  unswitch-color="rgba(255, 255, 255, 0.05)"
                >
                  <template #onswitch-icon>
                    <light-icon></light-icon>
                  </template>
                  <template #unswitch-icon>
                    <dark-icon></dark-icon>
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
          <GlobalContent></GlobalContent>
        </lay-body>
        <lay-footer></lay-footer>
      </lay-layout>
    </lay-layout>
    <GlobalSetup v-model="visible"></GlobalSetup>
  </lay-config-provider>
</template>
<script>
import { ref, watch } from "vue";
import DarkIcon from "../components/DarkIcon.vue"
import LightIcon from "../components/LightIcon.vue"
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../store/app";
import GlobalSetup from "./Global/GlobalSetup.vue";
import GlobalContent from "./Global/GlobalContent.vue";
export default {
  components: {
    GlobalSetup,
    GlobalContent,
    DarkIcon,
    LightIcon
  },
  setup() {

    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();

    const isTree = ref(true);
    const openKeys = ref(["0"]);
    const selectKey = ref(route.path);
    const collapseState = ref(false);
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
      appStore.routerAlive = false;
      setTimeout(function () {
        appStore.routerAlive = true;
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
      collapseState,
      allowClose,
      selectKey,
      collapse,
      appStore,
      openKeys,
      refresh,
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