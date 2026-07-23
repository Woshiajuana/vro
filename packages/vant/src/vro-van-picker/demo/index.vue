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

  <demo-block title="自定义筛选">
    <vro-van-trigger-cell
      v-model="customFilterCityText"
      label="目的地"
      placeholder="请选择目的地"
      @click="openCustomFilterCity"
    />
    <vro-van-picker ref="customPickerRef">
      <template #filter="{ keyword, placeholder, setKeyword }">
        <div class="demo-picker-filter">
          <input
            :value="keyword"
            :placeholder="placeholder"
            class="demo-picker-filter-input"
            type="text"
            @input="setKeyword(($event.target as HTMLInputElement).value)"
          />
        </div>
      </template>
    </vro-van-picker>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue'

  import type { VroVanPickerInstance, VroVanPickerProps, VroVanPickerResult } from '..'

  const pickerRef = useTemplateRef<VroVanPickerInstance>('pickerRef')
  const customPickerRef = useTemplateRef<VroVanPickerInstance>('customPickerRef')

  const cityValue = ref(['hangzhou'])
  const filterCityValue = ref<string[]>([])
  const areaValue = ref(['zhejiang', 'hangzhou'])
  const customFilterCityValue = ref<string[]>([])

  const cityText = ref('杭州')
  const filterCityText = ref('')
  const areaText = ref('浙江 / 杭州')
  const customFilterCityText = ref('')

  const cityColumns = [
    { text: '杭州', value: 'hangzhou' },
    { text: '上海', value: 'shanghai' },
    { text: '深圳', value: 'shenzhen' },
    { text: '成都', value: 'chengdu' },
    { text: '武汉', value: 'wuhan' },
  ]
  const areaColumns = [
    [
      { text: '浙江', value: 'zhejiang' },
      { text: '江苏', value: 'jiangsu' },
    ],
    [
      { text: '杭州', value: 'hangzhou' },
      { text: '南京', value: 'nanjing' },
    ],
  ]

  const openPicker = (
    options: Partial<VroVanPickerProps>,
    callback: (result: VroVanPickerResult) => void,
  ) => {
    pickerRef.value
      ?.show<VroVanPickerResult>(options)
      .then(callback)
      .catch(() => undefined)
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
        filterCityValue.value = result.selectedValues as string[]
        filterCityText.value = getSelectedText(result)
      },
    )
  }

  const openArea = () => {
    openPicker(
      {
        title: '选择地区',
        columns: areaColumns,
        modelValue: areaValue.value,
      },
      (result) => {
        areaValue.value = result.selectedValues as string[]
        areaText.value = getSelectedText(result)
      },
    )
  }

  const openCustomFilterCity = () => {
    customPickerRef.value
      ?.show<VroVanPickerResult>({
        title: '选择目的地',
        columns: cityColumns,
        modelValue: customFilterCityValue.value,
        filterable: true,
      })
      .then((result) => {
        customFilterCityValue.value = result.selectedValues as string[]
        customFilterCityText.value = getSelectedText(result)
      })
      .catch(() => undefined)
  }

  const getSelectedText = (result: VroVanPickerResult) => {
    return result.selectedOptions.map((option) => option?.text).join(' / ')
  }
</script>

<style lang="scss" scoped>
  .demo-picker-filter {
    padding: 8px 16px 12px;
  }

  .demo-picker-filter-input {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    padding: 0 12px;
    color: var(--van-primary-color);
    font-size: var(--van-font-size-md);
    background: rgba(25, 137, 250, 8%);
    border: 1px solid rgba(25, 137, 250, 35%);
    border-radius: var(--van-radius-sm);
    outline: none;
  }
</style>
