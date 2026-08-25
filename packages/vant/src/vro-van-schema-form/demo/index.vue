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
  import { Button as VanButton, showToast } from 'vant'
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
      city: {
        label: '城市',
        value: '',
        is: 'VroVanSelectPicker',
        options: [
          { text: '杭州', value: 'hangzhou' },
          { text: '上海', value: 'shanghai' },
        ],
      },
      plateNo: {
        label: '车牌号',
        value: '',
        is: 'VroVanPlateInput',
      },
      gender: {
        label: '性别',
        value: 'male',
        is: 'VroVanRadioButton',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
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
    },
    async (data) => {
      values.value = data
      showToast('提交成功')
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
