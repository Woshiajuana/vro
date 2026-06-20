<template>
  <el-tree
    v-bind="$attrs"
    class="vro-el-tree"
    :data="options"
    :default-checked-keys="checkedKeys"
    @check="handleCheck"
  >
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </el-tree>
</template>

<script setup lang="ts">
  import { isUndefined } from '@daysnap/utils'
  import { ElTree } from 'element-plus'
  import { computed } from 'vue'

  import { type VroElTreeKey, type VroElTreeOption, vroElTreeProps } from './types'

  defineOptions({ name: 'VroElTree' })

  const emit = defineEmits<{
    (event: 'update:modelValue', value: VroElTreeKey[]): void
  }>()
  const props = defineProps(vroElTreeProps)

  const checkedKeys = computed(() => {
    const { modelValue, options, rootId } = props
    const { childIds, mapping } = parseNodeIds(options)
    const modelValueMap = modelValue.reduce(
      (acc, id) => {
        acc[id] = true
        return acc
      },
      {} as Record<VroElTreeKey, boolean>,
    )

    const loop = (id: VroElTreeKey): boolean => {
      if (id === rootId) {
        return true
      }
      if (!modelValueMap[id]) {
        return false
      }
      const parentId = mapping[id]
      return !isUndefined(parentId) && loop(parentId)
    }

    return childIds.filter(loop)
  })

  const handleCheck = (_: any, data: any) => {
    const { checkedKeys, halfCheckedKeys } = data
    emit('update:modelValue', [...halfCheckedKeys, ...checkedKeys])
  }

  function parseNodeIds(
    data: VroElTreeOption[],
    mapping: Partial<Record<VroElTreeKey, VroElTreeKey>> = {},
  ) {
    const childIds: VroElTreeKey[] = []

    data.forEach((item) => {
      if (!isUndefined(item.parentId)) {
        mapping[item.id] = item.parentId
      }
      if (item.children && item.children.length > 0) {
        const res = parseNodeIds(item.children ?? [], mapping)
        childIds.push(...res.childIds)
      } else {
        childIds.push(item.id)
      }
    })
    return { childIds, mapping }
  }
</script>
