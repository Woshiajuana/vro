<template>
  <demo-block title="基础用法">
    <vro-van-trigger-cell
      v-model="dateTime"
      clearable
      label="日期时间"
      placeholder="请选择日期时间"
      @click="openDatetime"
    />
    <vro-van-datetime-picker ref="dateTimePickerRef" />
  </demo-block>

  <demo-block title="日期格式">
    <vro-van-trigger-cell
      v-model="date"
      clearable
      label="日期"
      placeholder="请选择日期"
      @click="openDate"
    />
    <vro-van-trigger-cell
      v-model="month"
      clearable
      label="月份"
      placeholder="请选择月份"
      @click="openMonth"
    />
  </demo-block>

  <demo-block title="时间格式">
    <vro-van-trigger-cell
      v-model="time"
      clearable
      label="时间"
      placeholder="请选择时间"
      @click="openTime"
    />
  </demo-block>

  <demo-block title="可选范围">
    <vro-van-trigger-cell
      v-model="rangeDate"
      clearable
      label="预约时间"
      placeholder="请选择预约时间"
      @click="openRange"
    />
  </demo-block>

  <demo-block title="函数式调用">
    <vro-van-trigger-cell
      v-model="functionDate"
      clearable
      label="开始时间"
      placeholder="请选择开始时间"
      @click="openFunction"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue'

  import {
    showVroVanDatetimePicker,
    type VroVanDatetimePickerInstance,
    type VroVanDatetimePickerResult,
  } from '..'

  const dateTimePickerRef = useTemplateRef<VroVanDatetimePickerInstance>('dateTimePickerRef')

  const dateTime = ref('2026-08-03 09:30:00')
  const date = ref('2026-08-03')
  const month = ref('2026-08')
  const time = ref('09:30')
  const rangeDate = ref('')
  const functionDate = ref('')

  const openPicker = (
    options: Record<string, any>,
    callback: (result: VroVanDatetimePickerResult) => void,
  ) => {
    dateTimePickerRef.value
      ?.show<VroVanDatetimePickerResult>(options)
      .then(callback)
      .catch(() => {})
  }

  const openDatetime = () => {
    openPicker(
      {
        title: '选择日期时间',
        modelValue: dateTime.value,
      },
      (result) => {
        dateTime.value = result.value
      },
    )
  }

  const openDate = () => {
    openPicker(
      {
        title: '选择日期',
        format: 'yyyy-MM-dd',
        modelValue: date.value,
      },
      (result) => {
        date.value = result.value
      },
    )
  }

  const openMonth = () => {
    openPicker(
      {
        title: '选择月份',
        format: 'yyyy-MM',
        modelValue: month.value,
      },
      (result) => {
        month.value = result.value
      },
    )
  }

  const openTime = () => {
    openPicker(
      {
        title: '选择时间',
        format: 'hh:mm',
        modelValue: time.value,
      },
      (result) => {
        time.value = result.value
      },
    )
  }

  const openRange = () => {
    openPicker(
      {
        title: '选择预约时间',
        format: 'yyyy-MM-dd hh:mm',
        min: new Date(2026, 7, 1, 9, 0, 0),
        max: new Date(2026, 7, 31, 18, 30, 0),
        modelValue: rangeDate.value,
      },
      (result) => {
        rangeDate.value = result.value
      },
    )
  }

  const openFunction = () => {
    showVroVanDatetimePicker({
      title: '选择开始时间',
      format: 'yyyy-MM-dd hh:mm',
      modelValue: functionDate.value,
    })
      .then((result) => {
        functionDate.value = result.value
      })
      .catch(() => {})
  }
</script>
