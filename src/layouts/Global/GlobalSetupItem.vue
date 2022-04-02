<template>
  <div class="global-setup-item">
    <div class="global-setup-item-label">
      {{ label }}
    </div>
    <div class="global-setup-item-extra">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default {
  name: "GlobalSetupItem",
};
</script>

<script lang="ts" setup>
interface SetupItemProps {
  label: string;
}

const props = withDefaults(defineProps<SetupItemProps>(), {
  label: "标题",
});
</script>

<style scoped>
.global-setup-item {
    height: 60px;
    line-height: 60px;
    padding: 0px 10px;
}
.global-setup-item-label {
    float: left;
}
.global-setup-item-extra {
    float: right;
}
</style>
