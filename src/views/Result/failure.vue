<template>
  <lay-card style="margin: 10px">
    <lay-result status="failure" style="margin-top: 100px">
      <template #content> 内容 </template>
      <template #extra>
        <lay-button>再次提交</lay-button>
        <lay-button type="primary">返回</lay-button>
      </template>
    </lay-result>
  </lay-card>
</template>