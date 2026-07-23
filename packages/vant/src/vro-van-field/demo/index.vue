<template>
  <demo-block title="基础用法">
    <vro-van-field v-model="username" label="用户名" placeholder="请输入用户名" clearable />
    <vro-van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
  </demo-block>

  <demo-block title="数字输入">
    <vro-van-field
      v-model="amount"
      type="decimal"
      label="金额"
      placeholder="请输入金额"
      clearable
      unit="元"
    />
    <vro-van-field
      v-model="quantity"
      type="number"
      label="数量"
      placeholder="请输入数量"
      clearable
    />
  </demo-block>

  <demo-block title="单元格能力">
    <vro-van-field
      v-model="phone"
      required
      label="手机号"
      placeholder="请输入手机号"
      prefix-icon="van-icon-phone-o"
      suffix-icon="van-icon-contact-o"
      clearable
    />
    <vro-van-field v-model="address" direction="column" label="详细地址" placeholder="请输入地址" />
    <vro-van-field v-model="readonlyValue" label="只读字段" readonly arrow />
    <vro-van-field v-model="disabledValue" disabled label="禁用字段" placeholder="禁用状态" />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const username = ref('')
  const password = ref('')
  const amount = ref('')
  const quantity = ref('')
  const phone = ref('')
  const address = ref('')
  const readonlyValue = ref('查看详情')
  const disabledValue = ref('不可编辑')
</script>
