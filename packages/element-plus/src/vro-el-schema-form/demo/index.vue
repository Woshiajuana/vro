<template>
  <demo-block title="全部组件">
    <div class="demo-inner">
      <vro-el-schema-form
        ref="schemaFormRef"
        :schema="schema"
        :form-props="{ labelWidth: '120px', labelPosition: 'top' }"
        :col-props="{ span: 12 }"
      />
      <el-space>
        <el-button type="primary" :loading="loading" @click="trigger">提交</el-button>
        <el-button @click="handleExtract">获取值</el-button>
      </el-space>
      <div class="demo-value">当前值：{{ values }}</div>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'

  import { useVroElSchemaForm, type VroElSchemaFormInstance } from '..'

  const values = ref<Record<string, any>>({})
  const schemaFormRef = ref<VroElSchemaFormInstance>()

  const { schema, loading, trigger } = useVroElSchemaForm(
    {
      elInput: {
        label: 'ElInput',
        value: '',
        is: 'ElInput',
        props: {
          placeholder: '请输入',
        },
      },
      elSelect: {
        label: 'ElSelect',
        value: '',
        is: 'ElSelect',
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ],
      },
      elRadioGroup: {
        label: 'ElRadioGroup',
        value: '1',
        is: 'ElRadioGroup',
        props: {
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      },
      elCheckboxGroup: {
        label: 'ElCheckboxGroup',
        value: ['1'],
        is: 'ElCheckboxGroup',
        props: {
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      },
      elDatePicker: {
        label: 'ElDatePicker',
        value: '',
        is: 'ElDatePicker',
      },
      elInputNumber: {
        label: 'ElInputNumber',
        value: 1,
        is: 'ElInputNumber',
      },
      elTreeSelect: {
        label: 'ElTreeSelect',
        value: '',
        is: 'ElTreeSelect',
        props: {
          data: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
          clearable: true,
          nodeKey: 'value',
        },
      },
      elCascader: {
        label: 'ElCascader',
        value: [],
        is: 'ElCascader',
        props: {
          options: [
            {
              label: '浙江',
              value: 'zhejiang',
              children: [{ label: '杭州', value: 'hangzhou' }],
            },
          ],
        },
      },
      elDivider: {
        label: '',
        value: '',
        is: 'ElDivider',
        props: {
          contentPosition: 'left',
        },
        colProps: {
          span: 24,
        },
      },
      vroElSelect: {
        label: 'VroElSelect',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ],
      },
      vroElCheckboxGroup: {
        label: 'VroElCheckboxGroup',
        value: ['1'],
        is: 'VroElCheckboxGroup',
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ],
      },
      vroElRadioGroup: {
        label: 'VroElRadioGroup',
        value: '1',
        is: 'VroElRadioGroup',
        options: [
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ],
      },
      vroElImageUpload: {
        label: 'VroElImageUpload',
        value: [],
        is: 'VroElImageUpload',
      },
      vroElFileUpload: {
        label: 'VroElFileUpload',
        value: [],
        is: 'VroElFileUpload',
      },
      vroElTags: {
        label: 'VroElTags',
        value: ['标签一', '标签二'],
        is: 'VroElTags',
      },
      vroElTree: {
        label: 'VroElTree',
        value: ['1'],
        is: 'VroElTree',
        props: {
          data: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      },
    },
    async (data) => {
      values.value = data
      ElMessage.success('提交成功')
    },
    {
      instanceRef: schemaFormRef,
    },
  )

  const handleExtract = async () => {
    values.value = (await schemaFormRef.value?.extractValues()) ?? {}
  }
</script>

<style lang="scss" scoped>
  .demo-inner {
    background-color: var(--van-doc-background-3);
    padding: 16px;
    display: flex;
    flex-direction: column;
  }
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
