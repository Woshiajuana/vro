<template>
  <ElTree
    v-bind="$attrs"
    class="vro-el-tree"
    :data="options"
    :default-checked-keys="checkedKeys"
    @check="handleCheck"
  />
</template>

<script setup lang="ts">
  import { isUndefined } from '@daysnap/utils'
  import { ElTree } from 'element-plus'
  import { computed } from 'vue'

  import { vroElTreeProps } from './types'

  defineOptions({ name: 'VroElTree' })

  const emit = defineEmits(['update:modelValue'])
  const props = defineProps(vroElTreeProps)

  const checkedKeys = computed(() => {
    const { modelValue, options, rootId } = props
    const { childIds, mapping } = parseNodeIds(options)
    const modelValueMap = modelValue.reduce(
      (acc, id) => {
        acc[id] = true
        return acc
      },
      {} as Record<string, boolean>,
    )

    const loop = (id: string): boolean => {
      if (id === rootId) {
        return true
      }
      if (!modelValueMap[id]) {
        return false
      }
      return loop(mapping[id])
    }

    return childIds.filter(loop)
  })

  const handleCheck = (_: any, data: any) => {
    const { checkedKeys, halfCheckedKeys } = data
    emit('update:modelValue', [...halfCheckedKeys, ...checkedKeys])
  }

  interface TreeItem {
    id: string
    parentId?: string
    children?: TreeItem[]
  }
  function parseNodeIds(data: TreeItem[], mapping: Record<string, string> = {}) {
    const childIds: string[] = []
    const parentIds: string[] = []

    data.forEach((item) => {
      if (!isUndefined(item.parentId)) {
        mapping[item.id] = item.parentId
      }
      if (item.children && item.children.length > 0) {
        parentIds.push(item.id)
        const res = parseNodeIds(item.children ?? [], mapping)
        parentIds.push(...res.parentIds)
        childIds.push(...res.childIds)
      } else {
        childIds.push(item.id)
      }
    })
    return { childIds, parentIds, mapping }
  }
</script>
