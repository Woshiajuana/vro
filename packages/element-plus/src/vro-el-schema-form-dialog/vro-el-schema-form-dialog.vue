<template>
  <el-dialog class="vro-el-schema-form-dialog">
    <span>vro-el-schema-form-dialog</span>
  </el-dialog>
</template>

<script setup lang="ts">
  import { vroElSchemaFormDialogProps } from './types'

  defineOptions({ name: 'VroElSchemaFormDialog' })

  const { show, hide, confirm, visible } = useVisible<Partial<VroElSchemaFormDialogProps>, any>({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => emit('cancel', reason),
    confirmCallback: (data) => emit('confirm', data),
  })

  defineProps(vroElSchemaFormDialogProps)
</script>
