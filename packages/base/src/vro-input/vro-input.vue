<template>
  <input
    v-bind="dynamicProps"
    class="vro-input"
    ref="inputRef"
    :value="modelValue ?? ''"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
  import { isNumber, omit } from '@daysnap/utils'
  import { useComposition, useId } from '@vrojs/use'
  import { computed, ref } from 'vue'

  import { parseDecimalString, parseNumberString } from '../utils'
  import { vroInputProps } from './types'

  defineOptions({ name: 'VroInput' })
  const props = defineProps(vroInputProps)
  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
    (event: 'blur', value: FocusEvent): void
  }>()

  const inputRef = ref<HTMLInputElement>()
  const fallbackId = useId()

  const dynamicProps = computed(() => {
    // eslint-disable-next-line prefer-const
    let { type, inputmode, ...rest } = props

    if (type === 'decimal') {
      type = 'text'
      inputmode = 'decimal'
    } else if (type === 'number') {
      type = 'tel'
      inputmode = 'numeric'
    }

    return {
      ...omit(rest, ['autoFix', 'formatter', 'modelValue', 'precision', 'max', 'min']),
      id: props.id ?? fallbackId,
      type,
      inputmode,
    }
  })

  const { handleCompositionStart, handleCompositionEnd } = useComposition()

  const handleBlur = (event: FocusEvent) => {
    const { type, modelValue } = props
    if (type === 'decimal') {
      const v = modelValue?.toString() ?? ''
      if (v === '-') {
        // 修复只输入 - 的情况
        emit('update:modelValue', '')
      } else if (v.endsWith('.')) {
        // 修复末尾只输入.的情况
        emit('update:modelValue', v.substring(0, v.length - 1))
      } else if (v !== '' && +v === 0) {
        // 修复 -0、-0.0 这种情况
        emit('update:modelValue', '0')
      }
    }
    emit('blur', event)
  }

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    if ((target as any)?.composing) {
      return
    }

    const { type, precision, min, max, formatter, modelValue, autoFix } = props
    let value = target.value

    if (type === 'number') {
      value = parseNumberString(value)
    } else if (type === 'decimal') {
      value = parseDecimalString(value, { precision: +precision, allowNegativeNumber: +min < 0 })

      const valueNumber = Number(value)
      const minNumber = Number(min)
      const maxNumber = Number(max)
      const canCompare = value !== '' && value !== '-' && Number.isFinite(valueNumber)

      if (canCompare && (valueNumber < minNumber || valueNumber > maxNumber)) {
        if (autoFix) {
          if (valueNumber < minNumber) {
            value = min.toString()
          } else if (valueNumber > maxNumber) {
            value = max.toString()
          }
        } else {
          value = modelValue?.toString() ?? ''
        }
      }
    }

    if (formatter) {
      value = formatter(value, isNumber(modelValue) ? modelValue.toString() : (modelValue ?? ''))
    }

    if (target.value !== value) {
      target.value = value
    }

    emit('update:modelValue', value)
  }

  defineExpose({
    get input() {
      return inputRef.value!
    },
  })
</script>
