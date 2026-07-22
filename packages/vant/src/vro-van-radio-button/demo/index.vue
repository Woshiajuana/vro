<template>
  <demo-block title="基础用法">
    <vro-van-radio-button v-model="basicValue" label="性别" :options="basicOptions" />
  </demo-block>

  <demo-block title="对象选项">
    <vro-van-radio-button
      v-model="cityValue"
      label="城市"
      label-key="name"
      value-key="id"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="列数和禁用">
    <vro-van-radio-button
      v-model="skillValue"
      direction="column"
      label="技能"
      :columns="2"
      :options="skillOptions"
    />
    <vro-van-radio-button v-model="disabledValue" disabled label="禁用" :options="basicOptions" />
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-radio-button
      v-model="slotValue"
      direction="column"
      label="通知方式"
      :options="noticeOptions"
    >
      <template #option="{ label, checked }">
        <span class="demo-radio-button-option" :class="{ 'is-checked': checked }">
          {{ label }}
        </span>
      </template>
    </vro-van-radio-button>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const basicValue = ref('男')
  const cityValue = ref(1)
  const skillValue = ref('前端')
  const disabledValue = ref('男')
  const slotValue = ref('短信')

  const basicOptions = ['男', '女']
  const cityOptions = [
    { id: 1, name: '杭州' },
    { id: 2, name: '上海' },
    { id: 3, name: '深圳', disabled: true },
  ]
  const skillOptions = ['前端', '后端', '设计', '测试']
  const noticeOptions = ['短信', '邮件', '电话']
</script>

<style lang="scss" scoped>
  .demo-radio-button-option {
    &.is-checked {
      font-weight: 600;
    }
  }
</style>
