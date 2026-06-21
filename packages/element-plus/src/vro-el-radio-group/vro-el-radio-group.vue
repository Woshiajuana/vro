<template>
  <ElRadioGroup
    v-bind="restProps"
    class="vro-el-radio-group"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  >
    <ElRadio
      v-for="(option, index) in options"
      v-bind="option.props"
      :key="index"
      :value="option[valueKey || 'value'] ?? option"
    >
      {{ option[labelKey || 'label'] ?? option }}
    </ElRadio>
  </ElRadioGroup>
</template>

<script setup lang="ts">
  import { pick } from '@daysnap/utils'
  import { ElRadio, ElRadioGroup, radioGroupProps } from 'element-plus'
  import { computed } from 'vue'

  import { vroElRadioGroupProps } from './types'

  defineOptions({ name: 'VroElRadioGroup' })

  defineEmits(['update:modelValue', 'change'])
  const props = defineProps(vroElRadioGroupProps)

  const restProps = computed(() => {
    return pick(props, Object.keys(radioGroupProps) as any[])
  })
</script>
