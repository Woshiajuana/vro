<template>
  <demo-block title="基础用法">
    <vro-van-trigger-cell
      v-model="plateText"
      label="车牌前缀"
      placeholder="请选择车牌前缀"
      @click="openPlate"
    />
    <vro-van-plate-picker ref="platePickerRef" />
  </demo-block>

  <demo-block title="隐藏额外选项">
    <vro-van-trigger-cell
      v-model="simplePlateText"
      label="车牌前缀"
      placeholder="请选择车牌前缀"
      @click="openSimplePlate"
    />
  </demo-block>

  <demo-block title="自定义额外选项">
    <vro-van-trigger-cell
      v-model="customPlateText"
      label="车牌状态"
      placeholder="请选择车牌状态"
      @click="openCustomPlate"
    />
  </demo-block>

  <demo-block title="函数式调用">
    <vro-van-trigger-cell
      v-model="functionPlateText"
      label="车牌前缀"
      placeholder="请选择车牌前缀"
      @click="openFunctionPlate"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue'

  import {
    type VroVanPlatePickerInstance,
    type VroVanPlatePickerProps,
    type VroVanPlatePickerResult,
  } from '..'

  const platePickerRef = useTemplateRef<VroVanPlatePickerInstance>('platePickerRef')

  const plateText = ref('京')
  const simplePlateText = ref('')
  const customPlateText = ref('')
  const functionPlateText = ref('')

  const openPicker = (
    options: Partial<VroVanPlatePickerProps>,
    callback: (result: VroVanPlatePickerResult) => void,
  ) => {
    platePickerRef.value
      ?.show<VroVanPlatePickerResult>(options)
      .then(callback)
      .catch((err) => {
        console.log('err => ', err)
      })
  }

  const openPlate = () => {
    openPicker(
      {
        value: plateText.value,
      },
      (result) => {
        plateText.value = result.value
      },
    )
  }

  const openSimplePlate = () => {
    openPicker(
      {
        title: '选择省份简称',
        value: simplePlateText.value,
        showExtra: false,
      },
      (result) => {
        simplePlateText.value = result.value
      },
    )
  }

  const openCustomPlate = () => {
    openPicker(
      {
        title: '选择车牌状态',
        value: customPlateText.value,
        extraKeys: ['新能源', '临牌'],
      },
      (result) => {
        customPlateText.value = result.value
      },
    )
  }

  const openFunctionPlate = () => {
    showVroVanPlatePicker({
      value: functionPlateText.value,
    })
      .then((result) => {
        functionPlateText.value = result.value
      })
      .catch((err) => {
        console.log('err => ', err)
      })
  }
</script>
