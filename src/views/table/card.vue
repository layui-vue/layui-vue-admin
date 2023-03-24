<template>
    <lay-container :fluid="true" style="padding: 10px">
        <lay-row :space="10">
            <lay-col :md="24">
                <lay-card>
                    <lay-form style="margin-top:20px;">
                        <lay-row>
                            <lay-col :md="4">
                                <lay-form-item :label-width="0">
                                    <lay-input style="width:100%"></lay-input>
                                </lay-form-item>
                            </lay-col>
                            <lay-col :md="6">
                                <lay-form-item label-width="0">
                                    <lay-button type="primary">查询</lay-button>
                                    <lay-button>重置</lay-button>
                                </lay-form-item>
                            </lay-col>
                        </lay-row>
                    </lay-form>
                </lay-card>
            </lay-col>
            <lay-col :md="24">
                <lay-card>
                    <lay-row :space="10">
                        <lay-col :md="6" v-for="(item, index) in dataSource" :key="index">
                            <lay-card class="card-list-item">
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png" />
                                <template #footer>
                                    <div class="button-list">
                                        <div><lay-icon type="layui-icon-flag"></lay-icon></div>
                                        <div><lay-icon type="layui-icon-edit"></lay-icon></div>
                                        <div><lay-icon type="layui-icon-share"></lay-icon></div>
                                        <div><lay-icon type="layui-icon-more"></lay-icon></div>    
                                    </div>
                                </template>
                            </lay-card>
                        </lay-col>
                    </lay-row>
                    <lay-page v-model="page.current" :total="page.total" :limit="page.limit" :showPage="true">
                    </lay-page>
                </lay-card>
            </lay-col>
        </lay-row>
    </lay-container>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
    setup() {

        const page = ref({ total: 100, limit: 10, current: 2 });

        const dataSource = [
            { id: "1", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "2", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "3", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "4", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "5", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "6", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "7", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
            { id: "8", username: "shana", password: "夏娜", remark: "花开堪折直须折,莫待无花空折枝", age: "22" },
        ];

        return {
            dataSource,
            page,
        };
    },
};
</script>

<style scoped>
:deep(.card-list-item .layui-card-body img){
    width: 100%;
}

:deep(.card-list-item .layui-card-body){
    padding: 0px !important;
}

.button-list {
    display: flex;
}

.button-list > div {
    flex: 1;
    text-align: center;
    color: #909399;
}
</style>
