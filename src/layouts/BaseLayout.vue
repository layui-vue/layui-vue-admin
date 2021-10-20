<template>
  <lay-layout :class="[collapseState ? 'collapse' : '']">
    <!-- 顶部区域 -->
    <lay-header>
      <lay-logo class="layui-bg-black">
        <span class="title">layui admin</span>
      </lay-logo>
      <lay-menu class="layui-layout-left">
        <lay-menu-item>
          <template v-slot:title>
            <a href="javascript:void(0)" @click="collapse">
              <lay-icon
                v-if="collapseState"
                type="layui-icon-spread-left"
              ></lay-icon>
              <lay-icon v-else type="layui-icon-shrink-right"></lay-icon>
            </a>
          </template>
        </lay-menu-item>
        <lay-menu-item id="1">
          <template v-slot:title>
            <a href="javascript:void(0)" @click="refresh">
              <lay-icon type="layui-icon-refresh-1"></lay-icon> </a
          ></template>
        </lay-menu-item>
      </lay-menu>
      <lay-menu class="layui-layout-right">
        <lay-menu-item id="0">
          <template v-slot:title>
            <a href="javascript:void(0)">
              <lay-icon type="layui-icon-notice"></lay-icon>
            </a>
          </template>
        </lay-menu-item>
        <lay-menu-item id="1">
          <template v-slot:title>
            <a href="javascript:void(0)">
              <lay-icon type="layui-icon-more-vertical"></lay-icon>
            </a>
          </template>
        </lay-menu-item>
      </lay-menu>
    </lay-header>
    <!-- 侧边区域 -->
    <lay-side :black="isBlack">
      <lay-menu :selectedKey="route.path" :openKeys="openKeys" :tree="isTree">
        <lay-menu-item title="工作空间" id="0">
          <lay-menu-child-item id="/console">
            <template v-slot:title>
              <router-link to="/console">控制台</router-link>
            </template>
          </lay-menu-child-item>
          <lay-menu-child-item id="/analysis">
            <template v-slot:title>
              <router-link to="/analysis">分析页</router-link>
            </template>
          </lay-menu-child-item>
        </lay-menu-item>
        <lay-menu-item title="错误页面" id="3">
          <lay-menu-child-item id="/error/403">
            <template v-slot:title>
              <router-link to="/error/403">403</router-link>
            </template>
          </lay-menu-child-item>
          <lay-menu-child-item id="/error/404">
            <template v-slot:title>
              <router-link to="/error/404">404</router-link>
            </template>
          </lay-menu-child-item>
          <lay-menu-child-item id="/error/500">
            <template v-slot:title>
              <router-link to="/error/500">500</router-link>
            </template>
          </lay-menu-child-item>
        </lay-menu-item>
      </lay-menu>
    </lay-side>
    <!-- 内容区域 -->
    <lay-body>
      <lay-tab
        v-model="route.path"
        @change="change"
        allowClose="true"
        @close="close"
      >
        <lay-tab-item
          v-for="tab in tabs"
          :key="tab"
          :title="tab.title"
          :id="tab.id"
        ></lay-tab-item>
      </lay-tab>
      <router-view v-if="isRouterAlive"></router-view>
    </lay-body>
    <lay-footer></lay-footer>
  </lay-layout>
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
    const collapseState = ref(false);
    const isRouterAlive = ref(true);
    const tabs = ref([{ title: "首页", id: "/console" }]);

    // event
    const change = function (path) {
      router.push(path);
    };

    const collapse = function () {
      collapseState.value = !collapseState.value;
    };

    const refresh = function () {
      isRouterAlive.value = false;
      setTimeout(function () {
        isRouterAlive.value = true;
      }, 500);
    };

    const close = function (path) {};

    // watch
    watch(route, function () {
      let bool = false;
      tabs.value.forEach((tab) => {
        if (tab.id === route.path) {
          bool = true;
        }
      });
      if (!bool) {
        tabs.value.push({ id: route.path, title: route.meta.title });
      }
    })

    return {
      isRouterAlive,
      collapseState,
      collapse,
      openKeys,
      isBlack,
      isTree,
      change,
      close,
      route,
      tabs,
    };
  },
};
</script>