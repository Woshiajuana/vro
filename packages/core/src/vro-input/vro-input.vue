<template>
  <input
    v-bind="dynamicProps"
    :value="modelValue"
    @compositionstart="handleCompositionstart"
    @compositionend="handleCompositionend"
    @input="handleInput"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup lang="ts">
  import { isFunction, isNumber, isRegExp, omit } from '@daysnap/utils'
  import { computed } from 'vue'

  import { useComposition, useId } from '../hooks'
  import { vroInputProps } from './types'

  defineOptions({ name: 'VroInput' })
  const props = defineProps(vroInputProps)
  const emit = defineEmits(['update:model-value', 'change', 'focus', 'blur'])

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

    const id = props.id ?? useId()

    return { ...omit(rest, ['pattern', 'modelValue', 'precision']), id, type, inputmode }
  })

  const { handleCompositionstart, handleCompositionend } = useComposition()

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    if ((target as any)?.composing) {
      return
    }
    let value = target.value
    const { type, precision, pattern, modelValue } = props

    if (type === 'number') {
      value = value.replace(/[^\d]/g, '')
    } else if (type === 'decimal') {
      // 小数 默认小数点 2 位
      // const reg = new RegExp(`^([1-9]\\d*|0)(\\.?\\d{0,${precision}})`, 'g')
      const reg = new RegExp(`^-?(0|[1-9]\\d*)?(\\.\\d{0,2})?`, 'g')
      const v = value.match(reg)
      console.log('handleInput => v ', v, precision, props)
      value = v ? v[0] : ''

      if (value.startsWith('0') && !value.startsWith('0.') && value.length > 1) {
        value = `${+value}`
      }
    }

    if (pattern) {
      if (isFunction(pattern)) {
        value = pattern(value, isNumber(modelValue) ? modelValue.toString() : (modelValue ?? ''))
      } else if (isRegExp(pattern)) {
        value = value.replace(pattern, '')
      }
    }

    if (target.value !== value) {
      target.value = value
    }
    emit('update:model-value', value)
    emit('change', value)
  }
</script>
