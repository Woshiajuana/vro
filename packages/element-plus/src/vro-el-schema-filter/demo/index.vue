<template>
  <demo-block title="基础用法">
    <vro-el-schema-filter
      :schema="schema"
      :form-props="{ labelWidth: '90px' }"
      @query="handleQuery"
      @reset="handleReset"
    />
    <div class="demo-value">查询参数：{{ query }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import type { VroElSchemaFormSchema } from '../../vro-el-schema-form'

  const query = ref<Record<string, any>>({})

  const schema = ref<VroElSchemaFormSchema>({
    keyword: {
      label: '关键词',
      value: '',
      is: 'ElInput',
      props: {
        placeholder: '请输入关键词',
      },
    },
    status: {
      label: '状态',
      value: '',
      defaultValue: '',
      is: 'VroElSelect',
      options: [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
    type: {
      label: '类型',
      value: 'all',
      resetValue: 'all',
      is: 'VroElRadioGroup',
      options: [
        { label: '全部', value: 'all' },
        { label: '个人', value: 'personal' },
        { label: '企业', value: 'company' },
      ],
    },
  })

  const handleQuery = (value: Record<string, any>) => {
    query.value = value
  }

  const handleReset = () => {
    query.value = {}
  }
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
