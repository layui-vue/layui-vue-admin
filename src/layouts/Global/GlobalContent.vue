<template>
    <div class="global-content">
        <router-view v-if="appStore.routerAlive"></router-view>
    </div>
</template>

<script lang="ts">
export default {
    name: "GlobalContent"
}
</script>

<script lang="ts" setup>
import Vue from 'vue'
import { useAppStore } from "../../store/app";
const appStore = useAppStore();
</script>

<style scoped>
.global-content {
    height: calc(100% - 42px);
    overflow: auto;
}
</style>