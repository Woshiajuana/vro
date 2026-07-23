<template>
  <demo-block title="基础用法">
    <vro-van-trigger-cell
      v-model="cityText"
      label="城市"
      placeholder="请选择城市"
      @click="openCity"
    />
    <vro-van-picker ref="pickerRef" />
  </demo-block>

  <demo-block title="可筛选">
    <vro-van-trigger-cell
      v-model="filterCityText"
      label="出发地"
      placeholder="请选择出发地"
      @click="openFilterCity"
    />
  </demo-block>

  <demo-block title="多列选择">
    <vro-van-trigger-cell
      v-model="areaText"
      label="地区"
      placeholder="请选择地区"
      @click="openArea"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue'

  import type { VroVanPickerInstance, VroVanPickerProps, VroVanPickerResult } from '..'

  const pickerRef = useTemplateRef<VroVanPickerInstance>('pickerRef')

  const cityValue = ref(['hangzhou'])
  const filterCityValue = ref<string[]>([])
  const areaValue = ref(['zhejiang', 'hangzhou'])

  const cityText = ref('杭州')
  const filterCityText = ref('')
  const areaText = ref('浙江 / 杭州')

  const cityColumns = [
    { text: '杭州', value: 'hangzhou' },
    { text: '上海', value: 'shanghai' },
    { text: '深圳', value: 'shenzhen' },
    { text: '成都', value: 'chengdu' },
    { text: '武汉', value: 'wuhan' },
  ]

  const openPicker = (
    options: Partial<VroVanPickerProps>,
    callback: (result: VroVanPickerResult) => void,
  ) => {
    pickerRef.value
      ?.show<VroVanPickerResult>(options)
      .then(callback)
      .catch((err) => {
        console.log('err => ', err)
      })
  }

  const openCity = () => {
    openPicker(
      {
        title: '选择城市',
        columns: cityColumns,
        modelValue: cityValue.value,
      },
      (result) => {
        cityValue.value = result.selectedValues as string[]
        cityText.value = getSelectedText(result)
      },
    )
  }

  const openFilterCity = () => {
    openPicker(
      {
        title: '选择出发地',
        columns: cityColumns,
        modelValue: filterCityValue.value,
        filterable: true,
      },
      (result) => {
        console.log('result => ', result)
        filterCityValue.value = result.selectedValues as string[]
        filterCityText.value = getSelectedText(result)
      },
    )
  }

  const openArea = () => {
    openPicker(
      {
        title: '选择地区',
        columns: [
          {
            text: '浙江',
            value: 'Zhejiang',
            children: [
              {
                text: '杭州',
                value: 'Hangzhou',
                children: [
                  { text: '西湖区', value: 'Xihu' },
                  { text: '余杭区', value: 'Yuhang' },
                ],
              },
              {
                text: '温州',
                value: 'Wenzhou',
                children: [
                  { text: '鹿城区', value: 'Lucheng' },
                  { text: '瓯海区', value: 'Ouhai' },
                ],
              },
            ],
          },
          {
            text: '福建',
            value: 'Fujian',
            children: [
              {
                text: '福州',
                value: 'Fuzhou',
                children: [
                  { text: '鼓楼区', value: 'Gulou' },
                  { text: '台江区', value: 'Taijiang' },
                ],
              },
            ],
          },
        ],
        modelValue: areaValue.value,
      },
      (result) => {
        areaValue.value = result.selectedValues as string[]
        areaText.value = getSelectedText(result)
      },
    )
  }

  const getSelectedText = (result: VroVanPickerResult) => {
    return result.selectedOptions.map((option) => option?.text).join(' / ')
  }
</script>
