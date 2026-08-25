<template>
  <demo-block title="基础用法">
    <vro-van-plate-input v-model="value" label="车牌号" />
  </demo-block>

  <demo-block title="可清空">
    <p>{{ clearableValue }}</p>
    <vro-van-plate-input v-model="clearableValue" label="车牌号" clearable />
  </demo-block>

  <demo-block title="限制长度">
    <vro-van-plate-input v-model="newEnergyValue" label="新能源车牌" :maxlength="8" />
  </demo-block>

  <demo-block title="自定义占位">
    <vro-van-plate-input v-model="placeholderValue" label="车牌号" placeholder="请输入后续号码" />
  </demo-block>

  <demo-block title="自定义弹层">
    <vro-van-plate-input
      v-model="customValue"
      label="车牌号"
      :plate-picker-props="{
        title: '选择地区',
        extraKeys: ['未上牌'],
      }"
      :keyboard-props="{
        title: '输入号码',
        disabledKeys: ['I', 'O'],
        onPaste: () => 'a12345',
      }"
    />
  </demo-block>

  <demo-block title="禁用状态">
    <vro-van-plate-input v-model="disabledValue" label="车牌号" disabled />
  </demo-block>

  <demo-block title="只读状态">
    <vro-van-plate-input v-model="readonlyValue" label="车牌号" readonly />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const clearableValue = ref('粤B12345')
  const newEnergyValue = ref('')
  const placeholderValue = ref('')
  const customValue = ref('')
  const disabledValue = ref('粤B12345')
  const readonlyValue = ref('粤B12345')
</script>
