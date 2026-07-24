<template>
  <demo-block title="基础用法">
    <vro-el-tags v-model="value" />
    <div class="demo-value">当前值：{{ value.join('、') || '-' }}</div>
  </demo-block>

  <demo-block title="禁用状态">
    <vro-el-tags v-model="disabledValue" disabled />
  </demo-block>

  <demo-block title="数量限制">
    <vro-el-tags v-model="maxValue" :max="3" />
    <div class="demo-value">当前值：{{ maxValue.join('、') || '-' }}</div>
  </demo-block>

  <demo-block title="属性配置">
    <vro-el-tags
      v-model="propsValue"
      :tag-props="{ type: 'success', effect: 'plain' }"
      :input-props="{ size: 'small', maxlength: 12 }"
      :button-props="{ size: 'small', type: 'success' }"
    />
  </demo-block>

  <demo-block title="自定义内容">
    <vro-el-tags v-model="slotValue">
      <template #tag="{ item, index }"> {{ index + 1 }}. {{ item }} </template>
      <template #add>新增技能</template>
    </vro-el-tags>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['Vue', 'Element Plus'])
  const disabledValue = ref(['只读', '不可编辑'])
  const maxValue = ref(['Vue', 'TypeScript'])
  const propsValue = ref(['组件', '配置'])
  const slotValue = ref(['Vue', 'Vite'])
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
