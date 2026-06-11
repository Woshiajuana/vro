<template>
  <demo-block title="基础用法">
    <ul class="vro-ul">
      <li>值：{{ value }}</li>
      <li>
        <p>未使用：</p>
        <input placeholder="请输入中文试试" :value="value" @input="handleInput" />
      </li>
      <li>
        <p>使用后：</p>
        <input
          placeholder="请输入中文试试"
          :value="value"
          @input="handleInput"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
        />
      </li>
    </ul>
  </demo-block>
</template>

<script setup lang="ts">
  import { useComposition } from '@vrojs/use'
  import { ref } from 'vue'

  const value = ref('')
  const { handleCompositionStart, handleCompositionEnd } = useComposition()

  const handleInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement
    if ((target as any)?.composing) {
      return
    }

    value.value = target.value
  }
</script>
