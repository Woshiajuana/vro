<template>
  <vro-van-cell
    v-bind="cellProps"
    class="vro-van-textarea"
    direction="column"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
    }"
    @click-prefix-icon="$emit('click-prefix-icon', $event)"
    @click-suffix-icon="$emit('click-suffix-icon', $event)"
  >
    <template v-for="(_, name) in slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps"></slot>
    </template>

    <div class="vro-van-textarea-control">
      <textarea
        v-bind="textareaProps"
        class="vro-van-textarea-input"
        ref="textareaRef"
        :value="modelValue ?? ''"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @blur="$emit('blur', $event)"
      ></textarea>

      <div v-if="showWordLimit && maxlength" class="vro-van-textarea-footer">
        <span class="vro-van-textarea-word-limit">{{ currentLength }}/{{ maxlength }}</span>
      </div>
    </div>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { omit, pick, typedKeys } from '@daysnap/utils'
  import { useComposition, useId } from '@vrojs/use'
  import { computed, nextTick, onMounted, useTemplateRef, watch } from 'vue'

  import { VroVanCell } from '../vro-van-cell'
  import {
    vroVanTextareaCellProps,
    type VroVanTextareaEmits,
    vroVanTextareaInputProps,
    vroVanTextareaProps,
    type VroVanTextareaSlots,
  } from './types'

  defineOptions({ name: 'VroVanTextarea' })
  const slots = defineSlots<VroVanTextareaSlots>()
  const emit = defineEmits<VroVanTextareaEmits>()
  const props = defineProps(vroVanTextareaProps)

  const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')
  const fallbackId = useId()

  const cellProps = computed(() => pick(props, typedKeys(vroVanTextareaCellProps)))
  const textareaProps = computed(() => {
    return {
      ...omit(pick(props, typedKeys(vroVanTextareaInputProps)), [
        'autosize',
        'modelValue',
        'showWordLimit',
      ]),
      id: props.id ?? fallbackId,
    }
  })
  const currentLength = computed(() => props.modelValue?.toString().length ?? 0)

  const { handleCompositionStart, handleCompositionEnd } = useComposition()

  const resizeTextarea = () => {
    const textarea = textareaRef.value
    if (!textarea || !props.autosize) {
      return
    }

    const autosize = typeof props.autosize === 'object' ? props.autosize : {}
    const lineHeight = Number.parseFloat(getComputedStyle(textarea).lineHeight)

    textarea.style.height = 'auto'
    textarea.style.maxHeight = ''
    textarea.style.overflowY = 'hidden'

    if (Number.isFinite(lineHeight)) {
      const { minRows, maxRows } = autosize
      const minHeight = minRows ? lineHeight * minRows : undefined
      const maxHeight = maxRows ? lineHeight * maxRows : undefined
      const height = Math.max(textarea.scrollHeight, minHeight ?? 0)

      textarea.style.height = `${height}px`

      if (maxHeight) {
        textarea.style.maxHeight = `${maxHeight}px`
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
      }
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleInput = (event: InputEvent) => {
    const target = event.target as HTMLTextAreaElement
    if ((target as any)?.composing) {
      return
    }

    emit('update:modelValue', target.value)
    emit('input', event)
    nextTick(resizeTextarea)
  }

  watch(
    () => [props.modelValue, props.autosize, props.rows],
    () => nextTick(resizeTextarea),
  )
  onMounted(resizeTextarea)

  defineExpose({
    get textarea() {
      return textareaRef.value!
    },
  })
</script>
