<template>
  <el-checkbox-group
    v-bind="restProps"
    class="vro-el-checkbox-group"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  >
    <el-checkbox
      v-for="(option, index) in options"
      v-bind="option.props"
      :key="index"
      :value="option[valueKey || 'value'] ?? option"
    >
      {{ option[labelKey || 'label'] ?? option }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
  import { pick } from '@daysnap/utils'
  import { checkboxGroupProps, ElCheckbox, ElCheckboxGroup } from 'element-plus'
  import { computed } from 'vue'

  import { vroElCheckboxGroupProps } from './types'

  defineOptions({ name: 'VroElCheckboxGroup' })
  defineEmits(['update:modelValue', 'change'])
  const props = defineProps(vroElCheckboxGroupProps)

  const restProps = computed(() => {
    return pick(props, Object.keys(checkboxGroupProps) as any[])
  })
</script>
