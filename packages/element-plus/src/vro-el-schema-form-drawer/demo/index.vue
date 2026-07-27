<template>
  <demo-block title="useVroElSchemaFormDrawer">
    <el-button type="primary" @click="openHookDrawer">打开抽屉</el-button>
    <div class="demo-value">提交结果：{{ result }}</div>
  </demo-block>

  <demo-block title="函数调用">
    <el-button @click="openFunctionDrawer">函数式打开</el-button>
  </demo-block>

  <demo-block title="自定义方向">
    <el-button @click="openBottomDrawer">底部打开</el-button>
  </demo-block>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'

  import type { VroElSchemaFormSchema } from '../../vro-el-schema-form'

  const result = ref<Record<string, any>>({})

  const [, openHookDrawer] = useVroElSchemaFormDrawer(createSchema, async (schema, instance) => {
    const data = await instance.show<Record<string, any>>({
      title: '编辑用户',
      schema,
      request: handleRequest,
    })

    result.value = data
    ElMessage.success('提交成功')
  })

  const openFunctionDrawer = async () => {
    const data = await showVroElSchemaFormDrawer<Record<string, any>>({
      title: '新建用户',
      schema: createSchema(),
      request: handleRequest,
    })

    result.value = data
    ElMessage.success('提交成功')
  }

  const openBottomDrawer = async () => {
    const data = await showVroElSchemaFormDrawer<Record<string, any>>({
      title: '底部抽屉',
      direction: 'btt',
      size: '70%',
      schema: createSchema(),
      request: handleRequest,
    })

    result.value = data
    ElMessage.success('提交成功')
  }

  const handleRequest = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return data
  }

  function createSchema(): VroElSchemaFormSchema {
    return {
      username: {
        label: '用户名',
        value: '',
        is: 'ElInput',
        rules: [{ required: true }],
      },
      role: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
        rules: [{ required: true }],
      },
      role1: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
        rules: [{ required: true }],
      },
      role2: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
        rules: [{ required: true }],
      },
      role3: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
        rules: [{ required: true }],
      },
      role4: {
        label: '角色',
        value: '',
        is: 'VroElSelect',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '运营', value: 'operator' },
        ],
        rules: [{ required: true }],
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
