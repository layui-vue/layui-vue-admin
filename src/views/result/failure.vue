<template>
  <lay-card style="margin: 10px">
    <lay-result status="failure" title="提交失败" style="margin-top: 100px">
      <template #content>
        <div class="content">
          您的账户还不具备申请资格。
        </div>
      </template>
      <template #extra>
        <lay-button type="primary">再次提交</lay-button>
        <lay-button>返回</lay-button>
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