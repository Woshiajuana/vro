<template>
  <demo-block title="基础用法">
    <vro-van-trigger-cell v-model="textValue" label="文本" placeholder="请输入" @click="openText" />
    <vro-van-keyboard ref="keyboardRef" />
  </demo-block>

  <demo-block title="限制长度">
    <vro-van-trigger-cell
      v-model="vinValue"
      label="VIN"
      placeholder="请输入 VIN"
      @click="openVin"
    />
  </demo-block>

  <demo-block title="禁用按键">
    <vro-van-trigger-cell
      v-model="disabledValue"
      label="禁用按键"
      placeholder="禁用 0 和 A"
      @click="openDisabled"
    />
  </demo-block>

  <demo-block title="粘贴">
    <vro-van-trigger-cell
      v-model="pasteValue"
      label="粘贴"
      placeholder="点击粘贴"
      @click="openPaste"
    />
  </demo-block>

  <demo-block title="函数式调用">
    <vro-van-trigger-cell
      v-model="functionValue"
      label="函数式调用"
      placeholder="请输入"
      @click="openFunction"
    />
  </demo-block>
</template>

<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue'

  import {
    type VroVanKeyboardInstance,
    type VroVanKeyboardProps,
    type VroVanKeyboardResult,
  } from '..'

  const keyboardRef = useTemplateRef<VroVanKeyboardInstance>('keyboardRef')

  const textValue = ref('')
  const vinValue = ref('')
  const disabledValue = ref('')
  const pasteValue = ref('')
  const functionValue = ref('')

  const openKeyboard = (
    options: Partial<VroVanKeyboardProps>,
    callback: (result: VroVanKeyboardResult) => void,
  ) => {
    keyboardRef.value
      ?.show<VroVanKeyboardResult>(options)
      .then(callback)
      .catch((err) => {
        console.log('err => ', err)
      })
  }

  const openText = () => {
    openKeyboard(
      {
        value: textValue.value,
        title: '输入文本',
        maxlength: 12,
      },
      (result) => {
        textValue.value = result.value
      },
    )
  }

  const openVin = () => {
    openKeyboard(
      {
        value: vinValue.value,
        title: '输入 VIN',
        maxlength: 17,
      },
      (result) => {
        vinValue.value = result.value
      },
    )
  }

  const openDisabled = () => {
    openKeyboard(
      {
        value: disabledValue.value,
        disabledKeys: ['0', 'A'],
      },
      (result) => {
        disabledValue.value = result.value
      },
    )
  }

  const openPaste = () => {
    openKeyboard(
      {
        value: pasteValue.value,
        onPaste: () => 'PASTE',
      },
      (result) => {
        pasteValue.value = result.value
      },
    )
  }

  const openFunction = () => {
    showVroVanKeyboard({
      value: functionValue.value,
      title: '函数式调用',
    })
      .then((result) => {
        functionValue.value = result.value
      })
      .catch((err) => {
        console.log('err => ', err)
      })
  }
</script>
