<template>
  <vro-el-schema-form
    v-bind="props"
    ref="refVroElSchemaForm"
    class="vro-el-schema-filter"
    @submit.prevent
    @keyup.enter="handleQuery"
  >
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
  import { filterEmptyValue, isArray, isFunction, isObject, isUndefined } from '@daysnap/utils'
  import { RefreshRight, Search } from '@element-plus/icons-vue'
  import { ElButton, ElCol, ElFormItem } from 'element-plus'
  import { useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import { VroElSchemaForm } from '../vro-el-schema-form'
  import { vroElSchemaFilterProps } from './types'

  defineOptions({ name: 'VroElSchemaFilter' })

  const emit = defineEmits(['query', 'reset'])
  const props = defineProps(vroElSchemaFilterProps)
  const { t } = useLocale()

  const refVroElSchemaForm = useTemplateRef('refVroElSchemaForm')

  const handleQuery = async () => {
    const data = (await refVroElSchemaForm.value?.extractValues()) ?? {}
    emit('query', filterEmptyValue(data, true))
  }
  const handleReset = () => {
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
    refVroElSchemaForm.value?.resetFields()
    emit('reset')
    handleQuery()
  }
</script>
