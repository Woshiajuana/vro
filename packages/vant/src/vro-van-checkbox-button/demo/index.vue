<template>
  <demo-block title="基础用法">
    <vro-van-checkbox-button v-model="basicValue" label="偏好" :options="basicOptions" />
  </demo-block>

  <demo-block title="对象选项">
    <vro-van-checkbox-button
      v-model="cityValue"
      label="城市"
      label-key="name"
      value-key="id"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="列数和限制">
    <vro-van-checkbox-button
      v-model="limitValue"
      label="技能"
      :columns="2"
      :max="2"
      :options="skillOptions"
    />
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-checkbox-button
      v-model="slotValue"
      direction="column"
      label="通知方式"
      :options="noticeOptions"
    >
      <template #option="{ label, checked }">
        <span class="demo-checkbox-button-option" :class="{ 'is-checked': checked }">
          {{ label }}
        </span>
      </template>
    </vro-van-checkbox-button>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const basicValue = ref(['读书'])
  const cityValue = ref([1])
  const limitValue = ref(['前端'])
  const slotValue = ref(['短信'])

  const basicOptions = ['读书', '跑步', '旅行', '吃饭', '看书', '打篮球']
  const cityOptions = [
    { id: 1, name: '杭州' },
    { id: 2, name: '上海' },
    { id: 3, name: '深圳', disabled: true },
  ]
  const skillOptions = ['前端', '后端', '设计', '测试']
  const noticeOptions = ['短信', '邮件', '电话']
</script>

<style lang="scss" scoped>
  .demo-checkbox-button-option {
    &.is-checked {
      font-weight: 600;
    }
  }
</style>
