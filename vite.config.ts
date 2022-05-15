import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { LayuiVueResolver } from 'unplugin-layui-vue-resolver'

export default defineConfig({
  plugins: [
  vue(),
  // 按需插件
  AutoImport({
    resolvers: [LayuiVueResolver({
      resolveIcons: true
    })],
  }),
  Components({
    resolvers: [LayuiVueResolver({
      resolveIcons: true
    })],
  }),]
})