<template>
    <div>
        <lay-card>
            <p class="title">分步表单</p>
            <p class="describe">表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式.</p>
        </lay-card>
        <lay-container :fluid="true" style="padding: 10px;padding-top: 0px;">
            <lay-card style="padding:40px;">
                
            </lay-card>
        </lay-container>
    </div>
</template>

<script lang="ts">
import { ref, watch, reactive } from "vue";
import { layer } from "@layui/layer-vue";

export default {
    setup() {

        const model = reactive({
            username: "admin",
            password: "123456",
            specialty: "1",
            hobby: "1",
            desc: "修复开启 isLazyimg:true 后, 图片懒加载但是图片不存在的报错问题"
        })

        const submitClick = function () {
            layer.msg(`${JSON.stringify(model)}`, () => { });
        };

        return {
            model,
            submitClick
        };
    },
};
</script>

<style scoped>
.title {
    font-size: 20px;
    font-weight: 500;
    margin-top: 12px;
    margin-bottom: 20px;
}

.describe {
    font-size: 14px;
    margin-bottom: 12px;
}
</style>