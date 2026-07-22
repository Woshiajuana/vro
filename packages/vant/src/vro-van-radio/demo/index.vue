<template>
  <demo-block title="基础用法">
    <vro-van-radio v-model="basicValue" label="性别" :options="basicOptions" />
  </demo-block>

  <demo-block title="对象选项">
    <vro-van-radio
      v-model="cityValue"
      label="城市"
      label-key="name"
      value-key="id"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="禁用状态">
    <vro-van-radio
      v-model="disabledOptionValue"
      label="标签"
      :options="disabledOptionOptions"
      checked-color="#1989fa"
      shape="dot"
    />
    <vro-van-radio v-model="disabledValue" disabled label="禁用" :options="basicOptions" />
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-radio
      v-model="slotValue"
      direction="column"
      label="通知"
      radio-direction="vertical"
      :options="cityOptions"
    >
      <template #option="{ option }">
        <span class="demo-radio-option">{{ option.name }}</span>
      </template>
    </vro-van-radio>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const basicValue = ref('男')
  const cityValue = ref(1)
  const disabledOptionValue = ref('前端')
  const disabledValue = ref('男')
  const slotValue = ref(2)

  const basicOptions = ['男', '女']
  const cityOptions = [
    { id: 1, name: '杭州' },
    { id: 2, name: '上海' },
    { id: 3, name: '深圳', disabled: true },
  ]
  const disabledOptionOptions = ['前端', '后端', { label: '设计', value: '设计', disabled: true }]
</script>

<style lang="scss" scoped>
  .demo-radio-option {
    color: var(--van-primary-color);
  }
</style>
