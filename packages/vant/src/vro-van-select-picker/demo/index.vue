<template>
  <demo-block title="基础用法">
    <vro-van-select-picker
      v-model="city"
      label="城市"
      placeholder="请选择城市"
      title="选择城市"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="可筛选">
    <vro-van-select-picker
      v-model="destination"
      clearable
      filterable
      label="目的地"
      placeholder="请选择目的地"
      title="选择目的地"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="异步选项">
    <vro-van-select-picker
      v-model="asyncCity"
      clearable
      label="出发地"
      placeholder="请选择出发地"
      title="选择出发地"
      trigger="immediately"
      :options="loadCityOptions"
    />
    <vro-van-select-picker
      v-model="lazyAsyncCity"
      clearable
      label="目的地"
      placeholder="请选择目的地"
      title="选择目的地"
      trigger="lazy"
      :options="loadCityOptions"
    />
  </demo-block>

  <demo-block title="状态">
    <vro-van-select-picker
      v-model="readonlyCity"
      label="只读"
      readonly
      title="选择城市"
      :options="cityOptions"
    />
    <vro-van-select-picker
      v-model="disabledCity"
      disabled
      label="禁用"
      title="选择城市"
      :options="cityOptions"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const city = ref('hangzhou')
  const destination = ref('')
  const asyncCity = ref('')
  const lazyAsyncCity = ref('')
  const readonlyCity = ref('shanghai')
  const disabledCity = ref('shenzhen')

  const cityOptions = [
    { text: '杭州', value: 'hangzhou' },
    { text: '上海', value: 'shanghai' },
    { text: '深圳', value: 'shenzhen' },
    { text: '成都', value: 'chengdu' },
    { text: '武汉', value: 'wuhan' },
  ]

  const loadCityOptions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return cityOptions
  }
</script>
