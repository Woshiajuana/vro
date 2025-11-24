<template>
  <div>
    <h2>ChildB</h2>

    <ul>
      <li>{{ count }}</li>
      <li><button @click="count++">+1</button></li>
      <li>{{ Date.now() }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const count = ref(0)
</script>

<style lang="scss" scoped>
  // @use '@/assets/scss/define.scss' as *;
</style>
