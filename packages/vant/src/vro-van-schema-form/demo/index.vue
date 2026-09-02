<template>
  <demo-block title="基础用法">
    <vro-van-schema-form ref="schemaFormRef" :schema="schema" />
    <div class="demo-schema-form-actions">
      <van-button type="primary" size="small" :loading="loading" @click="trigger">提交</van-button>
      <van-button size="small" @click="handleExtract">获取值</van-button>
    </div>
    <div class="demo-schema-form-value">当前值：{{ values }}</div>
  </demo-block>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { useVroVanSchemaForm, type VroVanSchemaFormInstance } from '..'

  const values = ref<Record<string, any>>({})
  const schemaFormRef = ref<VroVanSchemaFormInstance>()

  const { schema, loading, trigger } = useVroVanSchemaForm(
    {
      name: {
        label: '姓名',
        value: '',
        is: 'VroVanField',
        rules: [{ required: true, message: '请填写姓名' }],
      },
      remark: {
        label: '备注',
        value: '',
        is: 'VroVanTextarea',
        props: {
          maxlength: 50,
          showWordLimit: true,
        },
      },
      gender: {
        label: '性别',
        value: 'male',
        is: 'VroVanRadio',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
      femaleRemark: {
        label: '女性备注',
        value: '',
        is: 'VroVanField',
        hidden: (_, __, schema) => schema.gender.value !== 'female',
        props: {
          placeholder: '性别为女时显示',
        },
      },
      maleRemark: {
        label: '男性备注',
        value: '',
        is: 'VroVanField',
        hidden: (_, __, schema) => schema.gender.value !== 'male',
        props: {
          placeholder: '性别为男时显示',
        },
      },
      hobby: {
        label: '爱好',
        value: ['music'],
        is: 'VroVanCheckbox',
        options: [
          { label: '音乐', value: 'music' },
          { label: '运动', value: 'sport' },
        ],
      },
      contactTime: {
        label: '联系时间',
        value: 'morning',
        is: 'VroVanRadioButton',
        options: [
          { label: '上午', value: 'morning' },
          { label: '下午', value: 'afternoon' },
        ],
      },
      tags: {
        label: '标签',
        value: ['new'],
        is: 'VroVanCheckboxButton',
        options: [
          { label: '新客户', value: 'new' },
          { label: '重点', value: 'important' },
        ],
      },
      city: {
        label: '城市',
        value: '',
        is: 'VroVanSelectPicker',
        options: [
          { text: '杭州', value: 'hangzhou' },
          { text: '上海', value: 'shanghai' },
        ],
      },
      appointment: {
        label: '预约时间',
        value: '',
        is: 'VroVanDatetimeSelectPicker',
      },
      dateRange: {
        label: '日期范围',
        value: [],
        is: 'VroVanDatetimeRangeSelectPicker',
        props: {
          clickable: true,
          direction: 'column',
        },
      },
      images: {
        label: '图片',
        value: [],
        is: 'VroVanImageUploader',
        props: {
          max: 2,
          multiple: true,
        },
      },
      plateNo: {
        label: '车牌号',
        value: '',
        is: 'VroVanPlateInput',
      },
    },
    async (data) => {
      values.value = data
    },
    {
      instanceRef: schemaFormRef,
      throwError: true,
    },
  )

  const handleExtract = async () => {
    values.value = (await schemaFormRef.value?.extractValues()) ?? {}
  }
</script>

<style lang="scss" scoped>
  .demo-schema-form-actions {
    display: flex;
    gap: 8px;
    padding: 12px 16px 0;
  }

  .demo-schema-form-value {
    padding: 12px 16px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
  }
</style>
