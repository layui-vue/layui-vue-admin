<template>
  <lay-tab
    v-if="appStore.tab"
    :modelValue="route.path"
    :allowClose="allowClose"
    @change="change"
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
</template>

<script lang="ts">
export default {
    name: "GlobalTab"
}
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../store/app";

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const allowClose = ref(true);
const tabs = ref([{ title: "首页", id: "/console", closable: false }]);

const change = function (id: string) {
  router.push(id);
};

const close = function (path: string) {
  tabs.value = tabs.value.filter((ele) => ele.id != path);
};

watch(route, function () {
  let bool = false;
  tabs.value.forEach((tab) => {
    if (tab.id === route.path) {
      bool = true;
    }
  });
  if (!bool) {
    // @ts-ignore
    tabs.value.push({ id: route.fullPath, title: route.meta.title });
  }
});
</script>
