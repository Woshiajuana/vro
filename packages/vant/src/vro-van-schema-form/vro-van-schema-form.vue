<template>
  <div class="vro-van-schema-form">
    <span>vro-van-schema-form</span>
  </div>
</template>

<script setup lang="ts">
  import { vroVanSchemaFormProps } from './types'

  defineOptions({ name: 'VroVanSchemaForm' })

  defineProps(vroVanSchemaFormProps)
</script>
