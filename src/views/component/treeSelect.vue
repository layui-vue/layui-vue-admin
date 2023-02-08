<template>
    <div>
        <lay-card>
            <p class="header-title">下拉树</p>
            <p class="header-describe">二维条码 / 二维码（2-dimensional bar
                code）是用某种特定的几何图形按一定规律在平面（二维方向上）分布的、黑白相间的、记录数据符号信息的图形.</p>
        </lay-card>
        <lay-container :fluid="true" style="padding: 10px;padding-top: 0px;">
            <lay-card>
                <template #title>基础案例</template>
                <lay-tree-select v-model="value1" :data="data"></lay-tree-select>
            </lay-card>
            <lay-card>
                <template #title>进阶使用</template>
                <lay-tree-select v-model="value2" :data="data" multiple></lay-tree-select>
            </lay-card>
        </lay-container>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
    setup() {

        const value1 = ref(23);
        const value2 = ref([23]);

        const data = ref([{
            title: '一级1',
            id: 1,
            field: 'name1',
            children: [{
                title: '二级1-1 可允许跳转',
                id: 3,
                field: 'name11',
                href: 'https://www.layui.com/',
                children: [{
                    title: '三级1-1-3',
                    id: 23,
                    field: '',
                    children: [{
                        title: '四级1-1-3-1',
                        id: 24,
                        field: '',
                        children: [{
                            title: '五级1-1-3-1-1',
                            id: 30,
                        },
                        {
                            title: '五级1-1-3-1-2',
                            id: 31,
                        }]
                    }]
                },
                {
                    title: '三级1-1-1',
                    id: 7,
                    field: '',
                    children: [{
                        title: '四级1-1-1-1 可允许跳转',
                        id: 15,
                        href: 'https://www.layui.com/doc/'
                    }]
                },
                {
                    title: '三级1-1-2',
                    id: 8,
                    field: '',
                    children: [{
                        title: '四级1-1-2-1',
                        id: 32,
                    }]
                }]
            },
            {
                title: '二级1-2',
                id: 4,
                spread: true,
                children: [{
                    title: '三级1-2-1',
                    id: 9,
                },
                {
                    title: '三级1-2-2',
                    id: 10,
                }]
            },
            {
                title: '二级1-3',
                id: 20,
                field: '',
                children: [{
                    title: '三级1-3-1',
                    id: 21,
                    field: ''
                },
                {
                    title: '三级1-3-2',
                    id: 22,
                    field: ''
                }]
            }]
        },
        {
            title: '一级2',
            id: 2,
            children: [{
                title: '二级2-1',
                id: 5,
                spread: true,
                children: [{
                    title: '三级2-1-1',
                    id: 11,
                },
                {
                    title: '三级2-1-2',
                    id: 12,
                }]
            },
            {
                title: '二级2-2',
                id: 6,
                children: [{
                    title: '三级2-2-1',
                    id: 13,
                },
                {
                    title: '三级2-2-2',
                    id: 14,
                }]
            }]
        },
        {
            title: '一级3',
            id: 16,
            field: '',
            children: [{
                title: '二级3-1',
                id: 17,
                field: '',
                fixed: true,
                children: [{
                    title: '三级3-1-1',
                    id: 18,
                    field: ''
                },
                {
                    title: '三级3-1-2',
                    id: 19,
                    field: ''
                }]
            },
            {
                title: '二级3-2',
                id: 27,
                field: '',
                children: [{
                    title: '三级3-2-1',
                    id: 28,
                    field: ''
                },
                {
                    title: '三级3-2-2',
                    id: 29,
                    field: ''
                }]
            }]
        }]);

        return { value1, value2 , data };
    },
};
</script>

<style scoped>
.header-title {
    font-size: 20px;
    font-weight: 500;
    margin-top: 12px;
    margin-bottom: 20px;
}

.header-describe {
    font-size: 14px;
    margin-bottom: 12px;
}
</style>