<template>
  <lay-layout>
    <!-- 侧边区域 -->
    <lay-side :black="isBlack" :width="collapseState ? 0 : 230">
      <lay-logo class="layui-bg-black">
        <span>layui-admin</span>
      </lay-logo>
      <lay-menu :selectedKey="route.path" :openKeys="openKeys" :tree="isTree">
        <lay-menu-item title="工作空间" id="0">
          <lay-menu-item id="/console">
            <template v-slot:title>
              <router-link to="/console">控制台</router-link>
            </template>
          </lay-menu-item>
          <lay-menu-item id="/analysis">
            <template v-slot:title>
              <router-link to="/analysis">分析页</router-link>
            </template>
          </lay-menu-item>
        </lay-menu-item>
        <lay-menu-item title="错误页面" id="3">
          <lay-menu-item id="/error/403">
            <template v-slot:title>
              <router-link to="/error/403">403</router-link>
            </template>
          </lay-menu-item>
          <lay-menu-item id="/error/404">
            <template v-slot:title>
              <router-link to="/error/404">404</router-link>
            </template>
          </lay-menu-item>
          <lay-menu-item id="/error/500">
            <template v-slot:title>
              <router-link to="/error/500">500</router-link>
            </template>
          </lay-menu-item>
        </lay-menu-item>
      </lay-menu>
    </lay-side>
    <lay-layout>
      <lay-header>
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
          </lay-menu-item> </lay-menu
      ></lay-header>
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

    const close = function (path) {
      // 从数组中移除
      tabs.value = tabs.value.filter(ele => ele.id != path);
    };

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
    });

    // return instance
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

<style>
.layui-header {
  background: white;
}
.layui-header .layui-nav {
  background: white;
}
.layui-header .layui-nav.layui-layout-left {
  left: 0 !important ;
  position: relative !important;
}
.layui-header .layui-nav * {
  color: #393d49;
}
.layui-side {
  z-index: 9999;
  background: #393d49;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
.layui-body {
  background: whitesmoke;
}
.layui-logo {
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.layui-logo span {
  font-weight: normal;
  color: #fff;
}
</style>