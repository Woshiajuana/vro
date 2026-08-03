<template>
  <demo-block title="基础用法">
    <vro-van-trigger-cell
      v-model="basicText"
      label="操作"
      placeholder="请选择操作"
      @click="openBasic"
    />
    <vro-van-action-sheet ref="actionSheetRef" />
  </demo-block>

  <demo-block title="描述和状态">
    <vro-van-trigger-cell
      v-model="stateText"
      label="更多"
      placeholder="请选择操作"
      @click="openState"
    />
  </demo-block>

  <demo-block title="函数式调用">
    <vro-van-trigger-cell
      v-model="functionText"
      label="分享"
      placeholder="请选择渠道"
      @click="openFunction"
    />
  </demo-block>

  <demo-block title="自定义选项">
    <vro-van-action-sheet
      ref="customActionSheetRef"
      cancel-text="关闭"
      title="选择文件操作"
      :actions="fileActions"
      @select="handleCustomSelect"
    >
      <template #action="{ action }">
        <div class="demo-action-sheet-action">
          <span>{{ action.name }}</span>
          <small>{{ action.subname }}</small>
        </div>
      </template>
    </vro-van-action-sheet>
    <vro-van-trigger-cell
      v-model="customText"
      label="文件"
      placeholder="请选择操作"
      @click="openCustom"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import type { ActionSheetAction } from 'vant'
  import { ref, useTemplateRef } from 'vue'

  import { type VroVanActionSheetInstance, type VroVanActionSheetResult } from '..'

  const actionSheetRef = useTemplateRef<VroVanActionSheetInstance>('actionSheetRef')
  const customActionSheetRef = useTemplateRef<VroVanActionSheetInstance>('customActionSheetRef')

  const basicText = ref('')
  const stateText = ref('')
  const functionText = ref('')
  const customText = ref('')

  const basicActions = [
    { name: '编辑', value: 'edit' },
    { name: '复制', value: 'copy' },
    { name: '删除', value: 'delete', color: '#ee0a24' },
  ]

  const stateActions = [
    { name: '同步数据', value: 'sync', loading: true },
    { name: '归档', value: 'archive' },
    { name: '删除', value: 'delete', disabled: true },
  ]

  const shareActions = [
    { name: '微信', value: 'wechat', icon: 'wechat' },
    { name: '微博', value: 'weibo', icon: 'weibo' },
    { name: '复制链接', value: 'link' },
  ]

  const fileActions = [
    { name: '预览', subname: '在新页面打开文件' },
    { name: '下载', subname: '保存到本地设备' },
  ]

  const openBasic = () => {
    actionSheetRef.value
      ?.show<VroVanActionSheetResult>({
        actions: basicActions,
        title: '选择操作',
      })
      .then(({ action }) => {
        basicText.value = action.name ?? ''
      })
      .catch(() => {})
  }

  const openState = () => {
    actionSheetRef.value
      ?.show<VroVanActionSheetResult>({
        actions: stateActions,
        description: '部分操作可能暂不可用',
      })
      .then(({ action }) => {
        stateText.value = action.name ?? ''
      })
      .catch(() => {})
  }

  const openFunction = () => {
    showVroVanActionSheet({
      actions: shareActions,
      title: '分享给',
    })
      .then(({ action }) => {
        functionText.value = action.name ?? ''
      })
      .catch(() => {})
  }

  const handleCustomSelect = (action: ActionSheetAction) => {
    customText.value = action.name ?? ''
  }

  const openCustom = () => {
    customActionSheetRef.value?.show()
  }
</script>

<style lang="scss" scoped>
  .demo-action-sheet-action {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;

    small {
      color: var(--van-text-color-2);
      font-size: 12px;
    }
  }
</style>
