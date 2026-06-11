<template>
  <demo-block title="基础用法">
    <ul>
      <li v-for="(item, key) in metadata" :key="key">
        <span>{{ item.label }}：</span>

        <select v-if="item.is === 'select'" v-model="item.value">
          <option v-for="option in item.options" :key="option" :value="option">{{ option }}</option>
        </select>

        <input v-else-if="item.is === 'input'" v-model="item.value" :name="key" />

        <div v-else-if="item.is === 'radio'">
          <label><input v-model="item.value" type="radio" :name="key" :value="true" />是</label>
          <label><input v-model="item.value" type="radio" :name="key" :value="false" />否</label>
        </div>
      </li>
      <li>
        <vro-input v-model="value" v-bind="valueProps" ref="refVroInput" @change="handleChange" />
      </li>
      <li>值：{{ value }}</li>
      <li style="flex-flow: row; gap: 10px">
        <button @click="handleSubmit">提交</button>
        <button @click="refVroInput?.input.focus()">聚焦</button>
        <button @click="refVroInput?.input.blur()">失焦</button>
      </li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, useTemplateRef } from 'vue'

  const refVroInput = useTemplateRef('refVroInput')

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
    autoFix: {
      is: 'radio',
      value: true,
      label: '是否自动修正',
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

  const handleChange = (event: any) => {
    console.log('event => ', event)
  }
</script>
