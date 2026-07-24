<template>
  <div class="vro-el-tags">
    <el-tag
      v-for="(item, index) in modelValue"
      :key="`${item}-${index}`"
      size="large"
      disable-transitions
      v-bind="tagProps"
      class="vro-el-tags-tag"
      :closable="!disabled && tagProps?.closable !== false"
      @close="handleClose(index)"
    >
      <slot name="tag" :item="item" :index="index">
        {{ item }}
      </slot>
    </el-tag>

    <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-bind="inputProps"
      v-model="inputValue"
      class="vro-el-tags-input"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else-if="canAdd"
      :icon="Plus"
      v-bind="buttonProps"
      class="vro-el-tags-button"
      @click="showInput"
    >
      <slot name="add">
        {{ t('tags.addText') }}
      </slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import type { InputInstance } from 'element-plus'
  import { ElButton, ElInput, ElTag } from 'element-plus'
  import { computed, nextTick, ref, useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import { type VroElTagsEmits, vroElTagsProps, type VroElTagsSlots } from './types'

  defineOptions({ name: 'VroElTags' })

  const emit = defineEmits<VroElTagsEmits>()
  defineSlots<VroElTagsSlots>()

  const props = defineProps(vroElTagsProps)
  const { t } = useLocale()

  const inputValue = ref('')
  const inputVisible = ref(false)
  const inputRef = useTemplateRef<InputInstance>('inputRef')

  const canAdd = computed(() => {
    return !props.disabled && (props.max === undefined || props.modelValue.length < props.max)
  })

  const handleClose = (index: number) => {
    const value = props.modelValue.filter((_, valueIndex) => valueIndex !== index)
    emit('update:modelValue', value)
  }

  const showInput = () => {
    if (!canAdd.value) {
      return
    }

    inputVisible.value = true
    nextTick(() => {
      inputRef.value?.input?.focus()
    })
  }

  const handleInputConfirm = () => {
    const tag = inputValue.value.trim()
    if (tag && canAdd.value) {
      emit('update:modelValue', [...props.modelValue, tag])
    }

    inputVisible.value = false
    inputValue.value = ''
  }
</script>
