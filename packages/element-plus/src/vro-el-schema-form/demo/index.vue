<template>
  <demo-block title="基础用法">
    <vro-el-schema-form
      ref="refVroElSchemaForm"
      :schema="schema"
      :form-props="{ labelWidth: '90px' }"
      :col-props="{ span: 12 }"
    />
    <el-space>
      <el-button type="primary" :loading="loading" @click="trigger">提交</el-button>
      <el-button @click="handleExtract">获取值</el-button>
    </el-space>
    <div class="demo-value">当前值：{{ values }}</div>
  </demo-block>

  <demo-block title="动态显示">
    <vro-el-schema-form
      :schema="dynamicSchema"
      :form-props="{ labelWidth: '90px' }"
      :col-props="{ span: 12 }"
    />
  </demo-block>

  <demo-block title="字段插槽">
    <vro-el-schema-form
      :schema="slotSchema"
      :form-props="{ labelWidth: '90px' }"
      :col-props="{ span: 12 }"
    >
      <template #websiteLabel="{ item }">
        <span>{{ item.label }}</span>
      </template>
      <template #prepend>
        <span>https://</span>
      </template>
    </vro-el-schema-form>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { ref, watch } from 'vue'

  import { useVroElSchemaForm, type VroElSchemaFormInstance, type VroElSchemaFormSchema } from '..'

  const values = ref<Record<string, any>>({})
  const refVroElSchemaForm = ref<VroElSchemaFormInstance>()

  const { schema, loading, trigger } = useVroElSchemaForm(
    {
      username: {
        label: '用户名',
        value: '',
        is: 'ElInput',
        rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
      },
      role: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
        rules: [{ required: true, message: '请选择角色', trigger: 'change' }],
      },
    },
    async (data) => {
      values.value = data
      ElMessage.success('提交成功')
    },
    {
      instanceRef: refVroElSchemaForm,
    },
  )

  watch(
    () => schema.username.value,
    (v) => console.log('v => ', v),
  )

  const dynamicSchema = ref<VroElSchemaFormSchema>({
    accountType: {
      label: '账号类型',
      value: 'personal',
      is: 'VroElRadioGroup',
      options: [
        { label: '个人', value: 'personal' },
        { label: '企业', value: 'company' },
      ],
    },
    realName: {
      label: '姓名',
      value: '',
      is: 'ElInput',
      hidden: (_, __, metadata) => metadata.accountType.value !== 'personal',
    },
    companyName: {
      label: '企业名称',
      value: '',
      is: 'ElInput',
      hidden: (_, __, metadata) => metadata.accountType.value !== 'company',
    },
  })

  const slotSchema = ref<VroElSchemaFormSchema>({
    website: {
      label: '网址',
      value: '',
      is: 'ElInput',
      itemSlots: {
        websiteLabel: 'label',
      },
      slots: {
        prepend: 'prepend',
      },
    },
  })

  const handleExtract = async () => {
    values.value = (await refVroElSchemaForm.value?.extractValues()) ?? {}
  }
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
