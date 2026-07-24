<template>
  <el-tree
    ref="treeRef"
    v-bind="treeProps"
    class="vro-el-tree"
    :data="options"
    :default-checked-keys="checkedKeys"
    @check="handleCheck"
  >
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>

    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </el-tree>
</template>

<script setup lang="ts">
  import { isUndefined, pick, typedKeys } from '@daysnap/utils'
  import type { TreeInstance } from 'element-plus'
  import { ElTree, treeProps as elTreeProps } from 'element-plus'
  import { computed, nextTick, useTemplateRef, watch } from 'vue'

  import {
    type VroElTreeCheckInfo,
    type VroElTreeEmits,
    type VroElTreeKey,
    type VroElTreeOption,
    vroElTreeProps,
    type VroElTreeSlots,
  } from './types'

  defineOptions({ name: 'VroElTree' })

  const emit = defineEmits<VroElTreeEmits>()
  defineSlots<VroElTreeSlots>()
  const props = defineProps(vroElTreeProps)
  const treeRef = useTemplateRef<TreeInstance>('treeRef')

  const treeProps = computed(() => {
    return pick(props, typedKeys(elTreeProps))
  })

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

  watch(
    checkedKeys,
    async (value) => {
      await nextTick()
      treeRef.value?.setCheckedKeys(value)
    },
    { immediate: true },
  )

  const handleCheck = (option: VroElTreeOption, data: VroElTreeCheckInfo) => {
    const { checkedKeys, halfCheckedKeys } = data
    emit('check', option, data)
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
