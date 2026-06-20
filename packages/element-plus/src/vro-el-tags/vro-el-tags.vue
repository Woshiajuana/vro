<template>
  <div class="vro-el-tags">
    <ElTag
      v-for="(item, index) in modelValue"
      :key="index"
      class="vro-el-tag"
      size="large"
      :closable="!disabled"
      :disable-transitions="false"
      @close="handleClose(index)"
    >
      {{ item }}
    </ElTag>

    <ElInput
      v-if="inputVisible"
      v-model="inputValue"
      ref="InputRef"
      class="vro-el-tag-input"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <ElButton v-else-if="!disabled" class="vro-el-tag-btn" @click="showInput" icon="plus">
      新增
    </ElButton>
  </div>
</template>

<script setup lang="ts">
  import { ElButton, ElInput, ElTag } from 'element-plus'
  import { nextTick, ref } from 'vue'

  import { vroElTagsProps } from './types'

  defineOptions({ name: 'VroElTags' })

  const emit = defineEmits(['update:modelValue'])
  const props = defineProps(vroElTagsProps)

  const inputValue = ref('')
  const inputVisible = ref(false)
  const InputRef = ref<InstanceType<typeof ElInput>>()

  const handleClose = (index: number) => {
    const value = props.modelValue
    value.splice(index, 1)
    emit('update:modelValue', value)
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value!.input!.focus()
    })
  }

  const handleInputConfirm = () => {
    const value = [...props.modelValue]
    if (inputValue.value) {
      value.push(inputValue.value)
    }
    emit('update:modelValue', value)
    inputVisible.value = false
    inputValue.value = ''
  }
</script>
