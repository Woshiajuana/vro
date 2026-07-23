<template>
  <demo-block title="基础用法">
    <vro-van-trigger-cell
      v-model="city"
      label="城市"
      placeholder="请选择城市"
      @click="city = '杭州'"
    />
  </demo-block>

  <demo-block title="可清空">
    <vro-van-trigger-cell
      v-model="date"
      clearable
      label="日期"
      placeholder="请选择日期"
      @click="date = '2026-07-23'"
    />
  </demo-block>

  <demo-block title="格式化">
    <vro-van-trigger-cell
      v-model="amount"
      label="金额"
      placeholder="请选择金额"
      :formatter="(value) => `${value} 元`"
      @click="amount = 100"
    />
    <vro-van-trigger-cell
      v-model="user"
      label="用户"
      placeholder="请选择用户"
      :formatter="(value) => value.name"
      @click="user = { id: 2, name: '李四' }"
    />
  </demo-block>

  <demo-block title="禁用和只读">
    <vro-van-trigger-cell v-model="disabledValue" disabled label="禁用" placeholder="请选择" />
    <vro-van-trigger-cell
      v-model="readonlyValue"
      readonly
      clearable
      label="只读"
      placeholder="请选择"
    />
  </demo-block>

  <demo-block title="自定义内容">
    <vro-van-trigger-cell
      v-model="status"
      label="状态"
      placeholder="请选择状态"
      suffix-icon="van-icon-warning-o"
      @click="status = '已完成'"
    >
      <template #default="{ displayValue, isEmpty, placeholder }">
        <span class="demo-trigger-cell-value" :class="{ 'is-empty': isEmpty }">
          {{ isEmpty ? placeholder : displayValue }}
        </span>
      </template>
    </vro-van-trigger-cell>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const city = ref('')
  const date = ref('2026-07-23')
  const amount = ref(100)
  const user = ref({ id: 1, name: '张三' })
  const disabledValue = ref('不可点击')
  const readonlyValue = ref('只读内容')
  const status = ref('')
</script>

<style lang="scss" scoped>
  .demo-trigger-cell-value {
    color: var(--van-primary-color);

    &.is-empty {
      color: var(--van-text-color-3);
    }
  }
</style>
