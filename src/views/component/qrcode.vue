<template>
    <div>
        <lay-card>
            <p class="header-title">二维码</p>
            <p class="header-describe">二维条码 / 二维码（2-dimensional bar code）是用某种特定的几何图形按一定规律在平面（二维方向上）分布的、黑白相间的、记录数据符号信息的图形.</p>
        </lay-card>
        <lay-container :fluid="true" style="padding: 10px;padding-top: 0px;">
            <lay-card>
                <template #title>基础案例</template>
                <lay-qrcode text="123"></lay-qrcode>
            </lay-card>
        </lay-container>
    </div>
</template>

<script lang="ts">
import { useUserStore } from "../../store/user";

export default {
    setup() {
        return {};
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