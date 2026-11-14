<template>
  <el-tree
    :ref="setTreeRef"
    v-bind="$attrs"
    class="vro-el-tree"
    :data="treeData"
    :node-key="nodeKey"
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
  import { isUndefined } from '@daysnap/utils'
  import { ElTree } from 'element-plus'
  import { computed, nextTick, shallowRef, watch } from 'vue'

  import {
    type VroElTreeCheckInfo,
    type VroElTreeEmits,
    type VroElTreeKey,
    type VroElTreeOption,
    vroElTreeProps,
    type VroElTreeRef,
    type VroElTreeSlots,
  } from './types'

  // el-tree 的其余属性通过 $attrs 透传，这里关闭自动继承以便显式控制透传顺序
  defineOptions({ name: 'VroElTree', inheritAttrs: false })

  const emit = defineEmits<VroElTreeEmits>()
  defineSlots<VroElTreeSlots>()
  const props = defineProps(vroElTreeProps)
  const treeRef = shallowRef<VroElTreeRef | null>(null)

  // 用函数 ref 代替 ref="treeRef"：字符串 ref 会让 ElTree 的完整实例类型进入类型声明产物
  const setTreeRef = (el: unknown) => {
    treeRef.value = el ? (el as VroElTreeRef) : null
  }

  const treeData = computed<VroElTreeOption[]>(() => props.options ?? props.data ?? [])

  const checkedKeys = computed(() => {
    const { modelValue, rootId } = props
    const { childIds, mapping } = parseNodeIds(treeData.value)
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
