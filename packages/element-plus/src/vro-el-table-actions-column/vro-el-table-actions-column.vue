<template>
  <ElTableColumn v-bind="restProps" class="vro-el-table-actions-column">
    <template #default="scope">
      <slot :row="scope.row">
        <ElButton
          v-for="(item, index) in filterHiddenActions(actions, scope.row, scope.$index)"
          :key="index"
          link
          :type="item.type || 'primary'"
          :icon="item.icon"
          @click="item.onAction?.(scope.row, scope.$index)"
        >
          {{ item.label }}
        </ElButton>

        <ElDropdown
          v-if="filterHiddenActions(moreActions, scope.row, scope.$index).length"
          :trigger="moreTrigger"
        >
          <ElButton type="primary" link>更多</ElButton>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem
                v-for="(item, index) in filterHiddenActions(moreActions, scope.row, scope.$index)"
                :key="index"
              >
                <ElButton
                  link
                  :type="item.type || 'primary'"
                  :icon="item.icon"
                  @click="item.onAction?.(scope.row, scope.$index)"
                >
                  {{ item.label }}
                </ElButton>
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </slot>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElTableColumn } from 'element-plus'
  import { computed } from 'vue'

  import { elTableColumnProps } from '../utils'
  import { type VroElTableActionsColumnAction, vroElTableActionsColumnProps } from './types'

  defineOptions({ name: 'VroElTableActionsColumn' })

  const props = defineProps(vroElTableActionsColumnProps)

  const restProps = computed(() => {
    const res = pick(props, typedKeys(elTableColumnProps))
    return {
      ...res,
      className: [`vro-el-table-actions-column-cell`, res.className].filter(Boolean).join(' '),
    }
  })

  const filterHiddenActions = (
    actions: VroElTableActionsColumnAction[],
    item: any,
    index: number,
  ) => {
    return actions.filter((action) => {
      return action.hidden?.(item, index) ?? true
    })
  }
</script>
