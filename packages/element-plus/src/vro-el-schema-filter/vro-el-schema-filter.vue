<template>
  <vro-el-schema-form
    v-bind="schemaFormProps"
    ref="schemaFormRef"
    class="vro-el-schema-filter"
    @submit.prevent
    @keyup.enter="handleQuery"
  >
    <template v-for="name in forwardedSlotNames" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>

    <el-col v-bind="colProps">
      <el-form-item v-bind="formItemProps">
        <el-button type="primary" :icon="Search" :loading="loading" @click="handleQuery">
          {{ t('schemaFilter.searchText') }}
        </el-button>
        <el-button :icon="RefreshRight" :loading="loading" @click="handleReset">
          {{ t('schemaFilter.resetText') }}
        </el-button>
        <slot></slot>
      </el-form-item>
    </el-col>
  </vro-el-schema-form>
</template>

<script setup lang="ts">
  import {
    filterEmptyValue,
    isArray,
    isFunction,
    isObject,
    isUndefined,
    pick,
    typedKeys,
  } from '@daysnap/utils'
  import { RefreshRight, Search } from '@element-plus/icons-vue'
  import { ElButton, ElCol, ElFormItem } from 'element-plus'
  import { computed, useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import {
    VroElSchemaForm,
    type VroElSchemaFormInstance,
    vroElSchemaFormProps,
  } from '../vro-el-schema-form'
  import {
    type VroElSchemaFilterEmits,
    vroElSchemaFilterProps,
    type VroElSchemaFilterSlots,
  } from './types'

  defineOptions({ name: 'VroElSchemaFilter' })

  const emit = defineEmits<VroElSchemaFilterEmits>()
  const slots = defineSlots<VroElSchemaFilterSlots>()
  const props = defineProps(vroElSchemaFilterProps)
  const { t } = useLocale()

  const forwardedSlotNames = computed<string[]>(() => {
    return Object.keys(slots).filter((name) => name !== 'default')
  })

  const schemaFormProps = computed(() => {
    const value = pick(props, typedKeys(vroElSchemaFormProps))
    return {
      ...value,
      formProps: {
        labelWidth: props.labelWidth,
        ...value.formProps,
      },
    }
  })

  const schemaFormRef = useTemplateRef<VroElSchemaFormInstance>('schemaFormRef')

  const handleQuery = async () => {
    if (props.loading) {
      return
    }
    const data = (await schemaFormRef.value?.extractValues()) ?? {}
    emit('query', filterEmptyValue(data, true))
  }
  const handleReset = async () => {
    if (props.loading) {
      return
    }
    Object.values(props.schema).forEach((filed) => {
      // eslint-disable-next-line prefer-const
      let { value, resetValue } = filed
      if (!isUndefined(resetValue)) {
        value = isFunction(resetValue) ? resetValue(value) : resetValue
      } else if (isArray(value)) {
        value = []
      } else if (isObject(value)) {
        value = {}
      } else {
        value = ''
      }
      filed.value = value
    })
    schemaFormRef.value?.resetFields()
    emit('reset')
    await handleQuery()
  }
</script>
