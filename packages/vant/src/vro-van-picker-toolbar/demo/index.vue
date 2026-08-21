<template>
  <demo-block title="基础用法">
    <vro-van-picker-toolbar title="请选择" @cancel="onCancel" @confirm="onConfirm" />
  </demo-block>

  <demo-block title="自定义按钮文案">
    <vro-van-picker-toolbar title="选择城市" cancel-text="返回" confirm-text="完成" />
  </demo-block>

  <demo-block title="隐藏按钮">
    <vro-van-picker-toolbar title="只显示确认" :show-cancel-button="false" />
    <vro-van-picker-toolbar title="只显示取消" :show-confirm-button="false" />
  </demo-block>

  <demo-block title="自定义内容">
    <vro-van-picker-toolbar>
      <template #cancel>关闭</template>
      <template #title>自定义标题</template>
      <template #confirm>保存</template>
    </vro-van-picker-toolbar>
  </demo-block>
</template>

<script setup lang="ts">
  const onCancel = () => {
    console.log('cancel')
  }

  const onConfirm = () => {
    console.log('confirm')
  }
</script>
