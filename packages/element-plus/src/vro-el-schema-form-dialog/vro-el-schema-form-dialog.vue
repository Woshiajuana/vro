<template>
  <el-dialog v-model="visible" class="vro-el-schema-form-dialog">
    <span>vro-el-schema-form-dialog</span>
  </el-dialog>
</template>

<script setup lang="ts">
  import { useVisible } from '@vrojs/use'
  import { ref } from 'vue'

  import { type VroElSchemaFormDialogProps, vroElSchemaFormDialogProps } from './types'

  defineOptions({ name: 'VroElSchemaFormDialog' })
  defineProps(vroElSchemaFormDialogProps)
  const emit = defineEmits(['cancel', 'confirm'])

  const dynamicProps = ref<any>()

  const { show, hide, confirm, visible } = useVisible<Partial<VroElSchemaFormDialogProps>, any>({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => emit('cancel', reason),
    confirmCallback: (data) => emit('confirm', data),
  })

  defineExpose({
    show,
    hide,
    confirm,
  })
</script>
