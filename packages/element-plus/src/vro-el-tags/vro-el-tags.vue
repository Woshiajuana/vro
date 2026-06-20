<template>
  <div class="vro-el-tags">
    <el-tag
      v-for="(item, index) in modelValue"
      :key="`${item}-${index}`"
      class="vro-el-tag"
      size="large"
      :closable="!disabled"
      :disable-transitions="false"
      @close="handleClose(index)"
    >
      {{ item }}
    </el-tag>

    <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputValue"
      class="vro-el-tag-input"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else-if="!disabled" class="vro-el-tag-btn" :icon="Plus" @click="showInput">
      {{ t('tags.addText') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import { ElButton, ElInput, ElTag } from 'element-plus'
  import { nextTick, ref } from 'vue'

  import { useLocale } from '../locale'
  import { vroElTagsProps } from './types'

  defineOptions({ name: 'VroElTags' })

  const emit = defineEmits(['update:modelValue'])
  const props = defineProps(vroElTagsProps)
  const { t } = useLocale()

  const inputValue = ref('')
  const inputVisible = ref(false)
  const inputRef = ref<InstanceType<typeof ElInput>>()

  const handleClose = (index: number) => {
    const value = props.modelValue.filter((_, valueIndex) => valueIndex !== index)
    emit('update:modelValue', value)
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      inputRef.value?.input?.focus()
    })
  }

  const handleInputConfirm = () => {
    const value = [...props.modelValue]
    const tag = inputValue.value.trim()
    if (tag) {
      value.push(tag)
    }
    emit('update:modelValue', value)
    inputVisible.value = false
    inputValue.value = ''
  }
</script>
