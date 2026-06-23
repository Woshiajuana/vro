<template>
  <demo-block title="基础用法">
    <div ref="target" class="demo-scroll">
      <p v-for="item in 20" :key="item">列表项 {{ item }}</p>
    </div>
    <div class="demo-actions">
      <button @click="keep">保存位置</button>
      <button @click="restore">恢复位置</button>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { useKeepPosition } from '@vrojs/use'
  import { ref } from 'vue'

  const target = ref<HTMLElement>()
  const { keep, restore } = useKeepPosition({
    getTarget: () => target.value!,
  })
</script>

<style lang="scss" scoped>
  .demo-scroll {
    height: 120px;
    overflow: auto;
    border: 1px solid #e5e7eb;
    padding: 0 12px;
  }

  .demo-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
</style>
