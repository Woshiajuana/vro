<template>
  <el-table-column v-bind="tableColumnProps" class="vro-el-table-actions-column">
    <template #default="scope">
      <slot v-bind="scope">
        <el-button
          v-for="(item, index) in getVisibleActions(actions, scope.row, scope.$index)"
          :key="getActionKey(item, index)"
          link
          :type="item.type || 'primary'"
          :icon="item.icon"
          :loading="getActionLoading(item, scope.$index, index)"
          :disabled="item.disabled"
          @click.stop="handleAction(item, scope.row, scope.$index, index)"
        >
          <slot name="action" v-bind="{ ...scope, action: item }">
            {{ item.label }}
          </slot>
        </el-button>

        <el-dropdown
          v-if="getVisibleActions(moreActions, scope.row, scope.$index).length"
          :trigger="moreTrigger"
        >
          <el-button type="primary" link>
            {{ moreActionText }}
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in getVisibleActions(moreActions, scope.row, scope.$index)"
                :key="getActionKey(item, index)"
                :class="[
                  'vro-el-table-actions-column-dropdown-action',
                  item.type && `is-${item.type}`,
                ]"
                :icon="item.icon"
                :disabled="item.disabled || getActionLoading(item, scope.$index, index)"
                @click.stop="handleAction(item, scope.row, scope.$index, index)"
              >
                <slot name="more-action" v-bind="{ ...scope, action: item }">
                  {{ item.label }}
                </slot>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
  import { isFunction, isPromiseLike, pick, typedKeys } from '@daysnap/utils'
  import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElTableColumn } from 'element-plus'
  import { computed, reactive } from 'vue'

  import { useLocale } from '../locale'
  import { elTableColumnProps } from '../utils'
  import {
    type VroElTableActionsColumnAction,
    type VroElTableActionsColumnActions,
    vroElTableActionsColumnProps,
    type VroElTableActionsColumnSlots,
  } from './types'

  defineOptions({ name: 'VroElTableActionsColumn' })

  const props = defineProps(vroElTableActionsColumnProps)
  defineSlots<VroElTableActionsColumnSlots>()

  const { t } = useLocale()

  const tableColumnProps = computed(() => {
    const res = pick(props, typedKeys(elTableColumnProps))
    return {
      ...res,
      label: props.label ?? t('tableActionsColumn.label'),
      className: [`vro-el-table-actions-column-cell`, res.className].filter(Boolean).join(' '),
    }
  })

  const moreActionText = computed(() => props.moreText ?? t('tableActionsColumn.moreText'))
  const loadingActionMap = reactive(new Map<string | number, boolean>())

  const getVisibleActions = (actions: VroElTableActionsColumnActions, row: any, index: number) => {
    const actionList = typeof actions === 'function' ? actions(row, index) : actions

    return actionList.filter((action) => {
      return !(isFunction(action.hidden) ? action.hidden(row, index) : action.hidden)
    })
  }

  const getActionKey = (action: VroElTableActionsColumnAction, index: number) => {
    return action.key ?? `${index}-${action.label}`
  }

  const getActionLoading = (
    action: VroElTableActionsColumnAction,
    rowIndex: number,
    actionIndex: number,
  ) => {
    return !!loadingActionMap.get(`${rowIndex}-${getActionKey(action, actionIndex)}`)
  }

  const setActionLoading = (
    action: VroElTableActionsColumnAction,
    rowIndex: number,
    actionIndex: number,
    loading: boolean,
  ) => {
    loadingActionMap.set(`${rowIndex}-${getActionKey(action, actionIndex)}`, loading)
  }

  const handleAction = async (
    action: VroElTableActionsColumnAction,
    row: any,
    rowIndex: number,
    actionIndex: number,
  ) => {
    const result = action.onAction?.(row, rowIndex)

    if (!action.icon || !isPromiseLike(result)) {
      return
    }

    setActionLoading(action, rowIndex, actionIndex, true)

    try {
      await result
    } finally {
      setActionLoading(action, rowIndex, actionIndex, false)
    }
  }
</script>
