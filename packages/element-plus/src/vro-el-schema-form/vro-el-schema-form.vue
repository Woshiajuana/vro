<template>
  <div class="vro-el-schema-form">
    <span>vro-el-schema-form</span>
  </div>
</template>

<script setup lang="ts">
  import { vroElSchemaFormProps } from './types'

  defineOptions({ name: 'VroElSchemaForm' })

  defineProps(vroElSchemaFormProps)
</script>
