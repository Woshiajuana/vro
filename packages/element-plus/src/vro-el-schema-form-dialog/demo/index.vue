<template>
  <demo-block title="基础用法">
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
    <div class="demo-value">提交结果：{{ result }}</div>

    <vro-el-schema-form-dialog
      ref="dialogRef"
      title="编辑用户"
      :schema="schema"
      :request="handleRequest"
      @confirm="handleConfirm"
    />
  </demo-block>

  <demo-block title="函数调用">
    <el-button @click="openFunctionDialog">函数式打开</el-button>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'

  import type { VroElSchemaFormSchema } from '../../vro-el-schema-form'
  import {
    showVroElSchemaFormDialog,
    type VroElSchemaFormDialogInstance,
    type VroElSchemaFormDialogProps,
  } from '..'

  const result = ref<Record<string, any>>({})
  const dialogRef = ref<VroElSchemaFormDialogInstance>()
  const schema = ref(createSchema())

  const openDialog = () => {
    dialogRef.value?.show()
  }

  const handleRequest: VroElSchemaFormDialogProps['request'] = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return data
  }

  const handleConfirm = (data: Record<string, any>) => {
    result.value = data
    ElMessage.success('提交成功')
  }

  const openFunctionDialog = async () => {
    const data = await showVroElSchemaFormDialog({
      title: '新建用户',
      schema: createSchema(),
      request: handleRequest,
    })

    result.value = data
    ElMessage.success('提交成功')
  }

  function createSchema(): VroElSchemaFormSchema {
    return {
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
    }
  }
</script>

<style lang="scss" scoped>
  .demo-value {
    margin-top: 12px;
    color: var(--van-doc-text-color-2);
    font-size: 14px;
  }
</style>
