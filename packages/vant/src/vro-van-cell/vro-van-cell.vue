<template>
  <div class="vro-van-cell">
    <slot name="before"></slot>
    <div class="vro-van-cell-label">
      <slot name="prefix">
        <vro-van-icon v-if="iconProps" v-bind="iconProps">
          <slot name="icon-default"></slot>
        </vro-van-icon>
      </slot>
      <slot name="label">
        <span v-html="label"></span>
      </slot>
    </div>
    <div class="hor-cell-value">
      <slot>
        <span v-html="formatter(value)"></span>
      </slot>
      <slot name="suffix">
        <vro-van-icon v-if="arrow" class="vro-van-cell-icon" name="van-icon-arrow" />
      </slot>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script setup lang="ts">
  import { VroVanIcon } from '../vro-van-icon'
  import { vroVanCellProps } from './types'

  defineOptions({ name: 'VroVanCell' })

  defineProps(vroVanCellProps)
</script>
