<template>
  <el-select
    v-bind="restProps"
    class="vro-el-select"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  >
    <el-option
      v-for="(option, index) in options"
      v-bind="option.props"
      :key="index"
      :label="option[labelKey || 'label'] ?? option"
      :value="option[valueKey || 'value'] ?? option"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { pick } from '@daysnap/utils'
  import { ElOption, ElSelect, selectProps } from 'element-plus'
  import { computed } from 'vue'

  import { vroElSelectProps } from './types'

  defineOptions({ name: 'VroElSelect' })

  defineEmits(['update:modelValue', 'change'])
  const props = defineProps(vroElSelectProps)

  const restProps = computed(() => {
    return pick(props, Object.keys(selectProps) as any[])
  })
</script>
