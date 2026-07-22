<template>
  <demo-block title="基础用法">
    <vro-van-checkbox v-model="basicValue" label="爱好" :options="basicOptions" />
  </demo-block>

  <demo-block title="对象选项">
    <vro-van-checkbox
      v-model="cityValue"
      label="城市"
      label-key="name"
      value-key="id"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="禁用和限制">
    <vro-van-checkbox
      v-model="limitValue"
      label="标签"
      :max="2"
      :options="limitOptions"
      checked-color="#1989fa"
      shape="square"
    />
    <vro-van-checkbox v-model="disabledValue" disabled label="禁用" :options="basicOptions" />
  </demo-block>

  <demo-block title="使用插槽">
    <vro-van-checkbox
      v-model="slotValue"
      checkbox-direction="vertical"
      direction="column"
      label="通知"
      :options="cityOptions"
    >
      <template #option="{ option }">
        <span class="demo-checkbox-option">{{ option.name }}</span>
      </template>
    </vro-van-checkbox>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const basicValue = ref(['读书'])
  const cityValue = ref([1])
  const limitValue = ref(['前端'])
  const disabledValue = ref(['读书'])
  const slotValue = ref([2])

  const basicOptions = ['读书', '跑步', '旅行']
  const cityOptions = [
    { id: 1, name: '杭州' },
    { id: 2, name: '上海' },
    { id: 3, name: '深圳', disabled: true },
  ]
  const limitOptions = ['前端', '后端', '设计', '设计', '设计', '设计', '设计', '设计', '设计']
</script>

<style lang="scss" scoped>
  .demo-checkbox-option {
    color: var(--van-primary-color);
  }
</style>
