<template>
  <vro-van-cell>
    <van-checkbox-group>
      <van-checkbox
        v-for="item in options"
        :name="item[valueKey]"
        :key="item[valueKey]"
        :shape="shape"
        :disabled="item.disabled"
      >
        {{ item[labelKey] }}
      </van-checkbox>
    </van-checkbox-group>
  </vro-van-cell>
</template>

<script setup lang="ts">
  import { Checkbox as VanCheckbox, CheckboxGroup as VanCheckboxGroup } from 'vant'

  import { VroVanCell } from '../vro-van-cell'
  import { vroVanCheckboxProps } from './types'

  defineOptions({ name: 'VroVanCheckbox' })

  defineProps(vroVanCheckboxProps)
</script>
