<template>
  <slot> </slot>
</template>

<script setup lang="ts">
  import { provide, reactive } from 'vue'

  import { LOCALE } from '../locale'
  import { vroElConfigInjectionKey } from './injection'
  import {
    type VroElConfigProviderContext,
    vroElConfigProviderProps,
    type VroElLocale,
  } from './types'

  defineOptions({ name: 'VroElConfigProvider' })

  const props = defineProps(vroElConfigProviderProps)

  const mergeLocale = (source: VroElLocale = {}) => {
    return {
      schemaFilter: {
        ...LOCALE.schemaFilter,
        ...source.schemaFilter,
      },
      fileUpload: {
        ...LOCALE.fileUpload,
        ...source.fileUpload,
      },
      table: {
        ...LOCALE.table,
        ...source.table,
      },
      schemaForm: {
        ElInput: {
          ...LOCALE.schemaForm.ElInput,
          ...source.schemaForm?.ElInput,
        },
        ElSelect: {
          ...LOCALE.schemaForm.ElSelect,
          ...source.schemaForm?.ElSelect,
        },
        ElDatePicker: {
          ...LOCALE.schemaForm.ElDatePicker,
          ...source.schemaForm?.ElDatePicker,
        },
      },
      schemaFormDialog: {
        ...LOCALE.schemaFormDialog,
        ...source.schemaFormDialog,
      },
    }
  }

  const config = reactive<VroElConfigProviderContext>({
    get locale() {
      return mergeLocale(props.locale)
    },
  })

  provide(vroElConfigInjectionKey, config)
</script>
