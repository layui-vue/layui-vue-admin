<template>
  <lay-card style="margin: 10px">
    <lay-result status="success" title="提交成功" describe="提交结果页用于反馈一系列操作任务的处理结果，灰色区域可以显示一些补充的信息。" style="margin-top: 100px">
      <template #content> 
        <div class="content">
          已提交申请，等待部门审核。
        </div>
      </template>
      <template #extra>
        <lay-button type="primary">返回列表</lay-button>
        <lay-button >查看</lay-button>
        <lay-button >打印</lay-button>
      </template>
    </lay-result>
  </lay-card>
</template>

<style scoped>
.content {
  text-align: left;
  background: #fafafa;
  border-radius: 4px;
  padding: 20px;
}
</style>