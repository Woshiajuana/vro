<template>
  <el-table-column v-bind="tableColumnProps" class="vro-el-table-actions-column">
    <template #default="scope">
      <slot v-bind="scope">
        <el-button
          v-for="(item, index) in getVisibleActions(actions, scope.row, scope.$index)"
          :key="`${index}-${item.label}`"
          link
          :type="item.type || 'primary'"
          :icon="item.icon"
          :disabled="item.disabled"
          @click.stop="item.onAction?.(scope.row, scope.$index)"
        >
          <slot name="action" v-bind="{ ...scope, action: item }">
            {{ item.label }}
          </slot>
        </el-button>

        <template
          v-for="visibleMoreActions in [getVisibleActions(moreActions, scope.row, scope.$index)]"
          :key="scope.$index"
        >
          <el-dropdown v-if="visibleMoreActions.length" :trigger="moreTrigger">
            <el-button type="primary" link>
              {{ moreActionText }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in visibleMoreActions"
                  :key="`${index}-${item.label}`"
                  :disabled="item.disabled"
                >
                  <el-button
                    link
                    :type="item.type || 'primary'"
                    :icon="item.icon"
                    :disabled="item.disabled"
                    @click="item.onAction?.(scope.row, scope.$index)"
                  >
                    <slot name="more-action" v-bind="{ ...scope, action: item }">
                      {{ item.label }}
                    </slot>
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElTableColumn } from 'element-plus'
  import { computed } from 'vue'

  import { useLocale } from '../locale'
  import { elTableColumnProps } from '../utils'
  import {
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

  const getVisibleActions = (
    actions: VroElTableActionsColumnActions,
    row: any,
    index: number,
  ) => {
    const actionList = typeof actions === 'function' ? actions(row, index) : actions

    return actionList.filter((action) => {
      return !action.hidden?.(row, index)
    })
  }
</script>
