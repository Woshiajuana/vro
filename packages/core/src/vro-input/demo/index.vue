<template>
  <demo-block title="基础用法">
    <dl style="display: flex; flex-direction: column; gap: 16px">
      <dd v-for="(item, key) in metadata" :key="key">
        <span>{{ item.label }}：</span>

        <select v-if="item.is === 'select'" v-model="item.value">
          <option v-for="option in item.options" :key="option" :value="option">{{ option }}</option>
        </select>
        <input v-else-if="item.is === 'input'" v-model="item.value" :name="key" />
      </dd>
      <dd>
        <vro-input v-model="value" v-bind="valueProps" />
      </dd>
      <dd>值：{{ value }}</dd>
      <dd><button @click="handleSubmit">提交</button></dd>
    </dl>
  </demo-block>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'

  const value = ref('0')

  const metadata = reactive({
    type: {
      is: 'select',
      value: 'decimal',
      label: '类型',
      options: ['text', 'password', 'tel', 'number', 'decimal'],
    },
    precision: {
      is: 'input',
      value: '2',
      label: '精度',
    },
    min: {
      is: 'input',
      value: Number.MIN_SAFE_INTEGER,
      label: '最小值',
    },
    max: {
      is: 'input',
      value: '99999',
      label: '最大值',
    },
  } as const)

  const valueProps = computed(() => {
    return Object.entries(metadata).reduce<Record<string, any>>((res, [key, item]) => {
      res[key] = item.value
      return res
    }, {})
  })

  const handleSubmit = () => {
    console.log('handleSubmit => ', value.value)
  }
</script>
