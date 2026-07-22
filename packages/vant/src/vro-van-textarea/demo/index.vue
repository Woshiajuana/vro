<template>
  <demo-block title="基础用法">
    <vro-van-textarea v-model="message" label="留言" placeholder="请输入留言" />
  </demo-block>

  <demo-block title="字数统计">
    <vro-van-textarea
      v-model="intro"
      label="简介"
      placeholder="请输入简介"
      maxlength="80"
      show-word-limit
    />
  </demo-block>

  <demo-block title="自适应高度">
    <vro-van-textarea
      v-model="description"
      label="详细描述"
      placeholder="请输入详细描述"
      :autosize="{ minRows: 1, maxRows: 1 }"
      maxlength="120"
      show-word-limit
    />
  </demo-block>

  <demo-block title="单元格能力">
    <vro-van-textarea
      v-model="remark"
      required
      label="备注"
      placeholder="请输入备注"
      prefix-icon="van-icon-edit"
    />
    <vro-van-textarea v-model="readonlyValue" label="只读内容" readonly arrow />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const message = ref('')
  const intro = ref('')
  const description = ref('')
  const remark = ref('')
  const readonlyValue = ref('这是一段只读文本')
</script>
