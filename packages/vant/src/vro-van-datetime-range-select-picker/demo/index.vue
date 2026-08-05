<template>
  <demo-block title="基础用法">
    <vro-van-datetime-range-select-picker
      v-model="datetimeRange"
      clearable
      label="日期时间"
      start-title="选择开始时间"
      end-title="选择结束时间"
    />
  </demo-block>

  <demo-block title="日期格式">
    <vro-van-datetime-range-select-picker
      v-model="dateRange"
      clearable
      format="yyyy-MM-dd"
      label="日期范围"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      start-title="选择开始日期"
      end-title="选择结束日期"
    />
    <vro-van-datetime-range-select-picker
      v-model="timeRange"
      clearable
      format="hh:mm"
      label="时间范围"
      separator="~"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      start-title="选择开始时间"
      end-title="选择结束时间"
    />
  </demo-block>

  <demo-block title="返回 Date">
    <vro-van-datetime-range-select-picker
      v-model="dateValueRange"
      clearable
      format="yyyy-MM-dd hh:mm"
      label="预约时间"
      value-type="date"
    />
  </demo-block>

  <demo-block title="可选范围">
    <vro-van-datetime-range-select-picker
      v-model="limitedRange"
      clearable
      format="yyyy-MM-dd hh:mm"
      label="可选范围"
      :max="maxDate"
      :min="minDate"
    />
  </demo-block>

  <demo-block title="垂直布局">
    <vro-van-datetime-range-select-picker
      v-model="columnRange"
      clearable
      direction="column"
      format="yyyy-MM-dd hh:mm"
      label="活动时间"
      start-placeholder="请选择开始时间"
      end-placeholder="请选择结束时间"
    />
  </demo-block>

  <demo-block title="禁用和只读">
    <vro-van-datetime-range-select-picker v-model="readonlyRange" readonly label="只读" />
    <vro-van-datetime-range-select-picker v-model="disabledRange" disabled label="禁用" />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import type { VroVanDatetimeRangeSelectPickerModelValue } from '..'

  const datetimeRange = ref<VroVanDatetimeRangeSelectPickerModelValue>([
    '2026-08-03 09:30:00',
    '2026-08-03 18:30:00',
  ])
  const dateRange = ref<VroVanDatetimeRangeSelectPickerModelValue>(['2026-08-03', '2026-08-08'])
  const timeRange = ref<VroVanDatetimeRangeSelectPickerModelValue>(['09:30', '18:30'])
  const dateValueRange = ref<VroVanDatetimeRangeSelectPickerModelValue>([
    new Date(2026, 7, 3, 9, 30, 0),
    new Date(2026, 7, 3, 18, 30, 0),
  ])
  const limitedRange = ref<VroVanDatetimeRangeSelectPickerModelValue>([])
  const columnRange = ref<VroVanDatetimeRangeSelectPickerModelValue>([
    '2026-08-03 09:30',
    '2026-08-03 18:30',
  ])
  const readonlyRange = ref<VroVanDatetimeRangeSelectPickerModelValue>([
    '2026-08-03 09:30:00',
    '2026-08-03 18:30:00',
  ])
  const disabledRange = ref<VroVanDatetimeRangeSelectPickerModelValue>([
    '2026-08-03 09:30:00',
    '2026-08-03 18:30:00',
  ])

  const minDate = new Date(2026, 7, 1, 9, 0, 0)
  const maxDate = new Date(2026, 7, 31, 18, 30, 0)
</script>
