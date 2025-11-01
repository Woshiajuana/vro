<template>
  <demo-block title="基础用法">
    <select v-model="type">
      <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
    </select>
    <br />
    <br />
    <vro-input v-model="value" :type="type" />
    <br />
    <input
      data-v-5d93a0b6=""
      data-v-07191213=""
      type="tel"
      inputmode="numeric"
      maxlength="7"
      placeholder="请填写表显里程"
      class="as-field-input"
    />
    <br />
    <input class="el-input__inner" name="x" type="text" id="x1" />
    <br />
    <br />
    <p>值：{{ value }}</p>
  </demo-block>
</template>

<script setup lang="ts">
  import { VroInput } from '@vrojs/core'
  import { ref } from 'vue'

  const options = ['text', 'password', 'tel', 'number', 'decimal']
  const type = ref('text')
  const value = ref('1')
</script>
