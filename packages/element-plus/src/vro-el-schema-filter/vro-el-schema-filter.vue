<template>
  <VroElSchemaForm
    v-bind="props"
    ref="refVroElSchemaForm"
    class="vro-el-schema-filter"
    @submit.prevent
    @keyup.enter="handleQuery"
  >
    <ElCol v-bind="colProps">
      <ElFormItem v-bind="formItemProps">
        <ElButton type="primary" :icon="Search" :loading="loading" @click="handleQuery">
          搜索
        </ElButton>
        <ElButton :icon="RefreshRight" :loading="loading" @click="handleReset"> 重置 </ElButton>
        <slot></slot>
      </ElFormItem>
    </ElCol>
  </VroElSchemaForm>
</template>

<script setup lang="ts">
  import { filterEmptyValue, isArray, isObject, isUndefined } from '@daysnap/utils'
  import { RefreshRight, Search } from '@element-plus/icons-vue'
  import { ElButton, ElCol, ElFormItem } from 'element-plus'
  import { useTemplateRef } from 'vue'

  import { VroElSchemaForm } from '../vro-el-schema-form'
  import { vroElSchemaFilterProps } from './types'

  defineOptions({ name: 'VroElSchemaFilter' })

  const emit = defineEmits(['query', 'reset'])
  const props = defineProps(vroElSchemaFilterProps)

  const refVroElSchemaForm = useTemplateRef('refVroElSchemaForm')

  const handleQuery = async () => {
    const data = (await refVroElSchemaForm.value?.extractValues()) ?? {}
    emit('query', filterEmptyValue(data, true))
  }
  const handleReset = () => {
    Object.values(props.schema).forEach((filed) => {
      // eslint-disable-next-line prefer-const
      let { value, defaultValue } = filed
      if (!isUndefined(defaultValue)) {
        value = defaultValue
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
