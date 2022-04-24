import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'

import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { LayuiVueResolver } from "@layui/layui-vue";

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 vue 相关函数
      imports: ['vue',],
      // 自动导入 layer-vue 相关函数,例如 指令,layer 等
      resolvers: [
        // @ts-ignore
        LayuiVueResolver()
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      // 自动解析 layui-vue 组件
      resolvers: [
        // @ts-ignore
        LayuiVueResolver({
          resolveIcons: true,
        })
      ],
    }),]
})