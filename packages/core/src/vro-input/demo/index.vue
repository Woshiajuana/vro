<template>
  <demo-block title="基础用法">
    <select v-model="type">
      <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
    </select>
    <br />
    <br />
    <vro-input v-model="value" :type="type" precision=""/>
    <br />
    <br />
    <p>值：{{ value }}</p>
  </demo-block>
</template>

<script setup lang="ts">
  import { VroInput } from '@vrojs/core'
  import { ref } from 'vue'

  const options = ['text', 'password', 'tel', 'number', 'digit']
  const type = ref('digit')
  const value = ref()
</script>
