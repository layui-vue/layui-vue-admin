<template>
    <lay-card style="padding-top:200px;padding-bottom:200px;">
        <lay-exception status="401" title="401">
            <template #extra>
                <lay-button>刷新</lay-button>
                <lay-button type="primary">返回</lay-button>
            </template>
        </lay-exception>
    </lay-card>
</template>