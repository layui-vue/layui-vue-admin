<template>
  <lay-layer title="更多设置" type="drawer" area="360px" v-model="visible">
    <div class="global-setup">
      <!-- 颜色 -->
      <template
        v-for="(themeVariableName, index) in themeVariableNames"
        :key="index"
      >
        <lay-color-picker
          v-model="appStore.themeVariable[themeVariableName]"
        ></lay-color-picker>
      </template>
      <!-- 其他 -->
      <global-setup-item label="多选项卡">
        <lay-switch v-model="appStore.tab"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单层级">
        <lay-switch v-model="appStore.level"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单反选">
        <lay-switch v-model="appStore.inverted"></lay-switch>
      </global-setup-item>
    </div>
  </lay-layer>
</template>

<script lang="ts">
export default {
  name: "GlobalSetup",
};
</script>

<script lang="ts" setup>
import { useAppStore } from "../../store/app";
import { ref, watch } from "vue";
import globalSetupItem from "./GlobalSetupItem.vue";

const appStore = useAppStore();

const emits = defineEmits(["update:modelValue"]);

interface SetupProps {
  modelValue: boolean;
}

const props = withDefaults(defineProps<SetupProps>(), {
  modelValue: false,
});

const visible = ref(props.modelValue);

watch(visible, (val) => {
  emits("update:modelValue", val);
});

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  }
);

const themeVariableNames = [
  "--global-primary-color",
  "--global-normal-color",
  "--global-warm-color",
  "--global-danger-color",
  "--global-checked-color",
];
</script>

<style>
.global-setup {
  padding: 10px;
}
.global-setup .layui-colorpicker {
  margin-right: 10px;
}
</style>
