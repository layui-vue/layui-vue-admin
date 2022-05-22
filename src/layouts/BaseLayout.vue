<template>
  <lay-config-provider :themeVariable="appStore.themeVariable" :theme="appStore.theme">
    <lay-layout :class="[collapseState ? 'collapse' : '']">
      <!-- side -->
      <lay-side :width="sideWidth">
        <lay-logo></lay-logo>
        <lay-scroll style="height: calc(100% - 62px)">
          <global-menu :collapse="collapseState"></global-menu>
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
          <global-tab></global-tab>
          <global-content></global-content>
        </lay-body>
        <lay-footer></lay-footer>
      </lay-layout>
    </lay-layout>
    <global-setup v-model="visible"></global-setup>
  </lay-config-provider>
</template>

<script lang="ts">
import { ref } from "vue";
import DarkIcon from "../components/DarkIcon.vue"
import LightIcon from "../components/LightIcon.vue"
import { useAppStore } from "../store/app";
import GlobalSetup from "./Global/GlobalSetup.vue";
import GlobalContent from "./Global/GlobalContent.vue";
import GlobalTab from "./Global/GlobalTab.vue";
import GlobalMenu from "./Global/GlobalMenu.vue";

export default {
  components: {
    GlobalSetup,
    GlobalContent,
    GlobalTab,
    GlobalMenu,
    DarkIcon,
    LightIcon
  },
  setup() {

    const appStore = useAppStore();
    const collapseState = ref(false);
    const visible = ref(false);
    const sideWidth = ref("230px");

    const changeVisible = function () {
      visible.value = !visible.value;
    };

    // 侧边状态
    const collapse = function () {
      collapseState.value = !collapseState.value;
      sideWidth.value = collapseState.value ? "60px": "230px";
    };

    // 路由刷新
    const refresh = function () {
      appStore.routerAlive = false;
      setTimeout(function () {
        appStore.routerAlive = true;
      }, 500);
    };

    // return instance
    return {
      sideWidth, 
      changeVisible,
      collapseState,
      collapse,
      appStore,
      refresh,
      visible
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