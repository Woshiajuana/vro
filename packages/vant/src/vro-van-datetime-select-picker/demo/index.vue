<template>
  <demo-block title="基础用法">
    <vro-van-datetime-select-picker
      v-model="datetime"
      clearable
      label="日期时间"
      placeholder="请选择日期时间"
      title="选择日期时间"
    />
  </demo-block>

  <demo-block title="日期格式">
    <vro-van-datetime-select-picker
      v-model="date"
      clearable
      format="yyyy-MM-dd"
      label="日期"
      placeholder="请选择日期"
      title="选择日期"
    />
    <vro-van-datetime-select-picker
      v-model="time"
      clearable
      format="hh:mm"
      label="时间"
      placeholder="请选择时间"
      title="选择时间"
    />
  </demo-block>

  <demo-block title="返回 Date">
    <vro-van-datetime-select-picker
      v-model="dateValue"
      clearable
      format="yyyy-MM-dd hh:mm"
      label="开始时间"
      placeholder="请选择开始时间"
      title="选择开始时间"
      value-type="date"
    />
  </demo-block>

  <demo-block title="可选范围">
    <vro-van-datetime-select-picker
      v-model="rangeDatetime"
      clearable
      format="yyyy-MM-dd hh:mm"
      label="预约时间"
      placeholder="请选择预约时间"
      title="选择预约时间"
      :max="maxDate"
      :min="minDate"
    />
  </demo-block>

  <demo-block title="禁用和只读">
    <vro-van-datetime-select-picker
      v-model="readonlyDatetime"
      readonly
      label="只读"
      title="选择时间"
    />
    <vro-van-datetime-select-picker
      v-model="disabledDatetime"
      disabled
      label="禁用"
      title="选择时间"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const datetime = ref('2026-08-03 09:30:00')
  const date = ref('2026-08-03')
  const time = ref('09:30')
  const dateValue = ref<Date | string>(new Date(2026, 7, 3, 9, 30, 0))
  const rangeDatetime = ref('')
  const readonlyDatetime = ref('2026-08-03 09:30:00')
  const disabledDatetime = ref('2026-08-03 09:30:00')

  const minDate = new Date(2026, 7, 1, 9, 0, 0)
  const maxDate = new Date(2026, 7, 31, 18, 30, 0)
</script>
