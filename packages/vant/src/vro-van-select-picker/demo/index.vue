<template>
  <demo-block title="基础用法">
    <vro-van-select-picker
      v-model="city"
      clearable
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

  <demo-block title="多列选择">
    <vro-van-select-picker
      v-model="date"
      clearable
      label="日期"
      placeholder="请选择日期"
      title="选择日期"
      :options="dateOptions"
    />
  </demo-block>

  <demo-block title="级联选择">
    <vro-van-select-picker
      v-model="area"
      clearable
      label="地区"
      placeholder="请选择地区"
      title="选择地区"
      :options="areaOptions"
    />
  </demo-block>

  <demo-block title="对象值">
    <vro-van-select-picker
      v-model="cityObject"
      clearable
      label="城市"
      placeholder="请选择城市"
      title="选择城市"
      value-type="object"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="自定义字段">
    <vro-van-select-picker
      v-model="customCity"
      clearable
      label="城市"
      placeholder="请选择城市"
      title="选择城市"
      :columns-field-names="{ text: 'label', value: 'id', children: 'children' }"
      :options="customCityOptions"
    />
  </demo-block>

  <demo-block title="格式化展示">
    <vro-van-select-picker
      v-model="formattedCity"
      clearable
      label="城市"
      placeholder="请选择城市"
      title="选择城市"
      :formatter="formatCity"
      :options="cityOptions"
    />
  </demo-block>

  <demo-block title="异步选项">
    <vro-van-select-picker
      v-model="asyncCity"
      clearable
      label="预加载"
      placeholder="请选择城市"
      title="选择城市"
      trigger="immediately"
      :options="loadCityOptions"
    />
    <vro-van-select-picker
      v-model="lazyAsyncCity"
      clearable
      label="点击加载"
      placeholder="请选择城市"
      title="选择城市"
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
  import type { PickerOption } from 'vant'
  import { ref } from 'vue'

  const city = ref('hangzhou')
  const destination = ref('')
  const date = ref(['2026', '08', '03'])
  const area = ref(['zhejiang', 'hangzhou', 'xihu'])
  const cityObject = ref<PickerOption>({ text: '上海', value: 'shanghai' })
  const customCity = ref(1)
  const formattedCity = ref('chengdu')
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

  const dateOptions = [
    [
      { text: '2025年', value: '2025' },
      { text: '2026年', value: '2026' },
      { text: '2027年', value: '2027' },
    ],
    [
      { text: '07月', value: '07' },
      { text: '08月', value: '08' },
      { text: '09月', value: '09' },
    ],
    [
      { text: '01日', value: '01' },
      { text: '02日', value: '02' },
      { text: '03日', value: '03' },
    ],
  ]

  const areaOptions = [
    {
      text: '浙江',
      value: 'zhejiang',
      children: [
        {
          text: '杭州',
          value: 'hangzhou',
          children: [
            { text: '西湖区', value: 'xihu' },
            { text: '余杭区', value: 'yuhang' },
          ],
        },
        {
          text: '温州',
          value: 'wenzhou',
          children: [
            { text: '鹿城区', value: 'lucheng' },
            { text: '瓯海区', value: 'ouhai' },
          ],
        },
      ],
    },
    {
      text: '福建',
      value: 'fujian',
      children: [
        {
          text: '福州',
          value: 'fuzhou',
          children: [
            { text: '鼓楼区', value: 'gulou' },
            { text: '台江区', value: 'taijiang' },
          ],
        },
      ],
    },
  ]

  const customCityOptions = [
    { label: '杭州', id: 1 },
    { label: '上海', id: 2 },
    { label: '深圳', id: 3 },
  ]

  const cityMap = cityOptions.reduce<Record<string, string>>((res, item) => {
    res[item.value] = item.text
    return res
  }, {})

  const formatCity = (value: string) => {
    return value ? `当前：${cityMap[value] ?? value}` : ''
  }

  const loadCityOptions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return cityOptions
  }
</script>
