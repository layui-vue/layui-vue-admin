<template>
  <lay-layer title="更多设置" type="drawer" area="360px" v-model="visible">
    <lay-color-picker
      v-model="appStore.themeVariable['--global-primary-color']"
    ></lay-color-picker>
    <lay-color-picker
      v-model="appStore.themeVariable['--global-normal-color']"
    ></lay-color-picker>
    <lay-color-picker
      v-model="appStore.themeVariable['--global-warm-color']"
    ></lay-color-picker>
    <lay-color-picker
      v-model="appStore.themeVariable['--global-danger-color']"
    ></lay-color-picker>
    <lay-color-picker
      v-model="appStore.themeVariable['--global-checked-color']"
    ></lay-color-picker>
  </lay-layer>
</template>

<script lang="ts" setup>
import { ref } from "vue-demi";

interface SetupProps {
  visible: boolean
}

const props = withDefaults(defineProps<SetupProps>(), {
  visible: false
});

</script>
