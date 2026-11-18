<template>
  <el-descriptions class="vro-el-schema-descs" v-bind="{ border: true, ...descProps }">
    <el-descriptions-item
      v-for="(item, index) in metadata"
      :key="item.key ?? item.prop ?? index"
      v-bind="{ ...itemProps, ...item.itemProps }"
      :label="item.label ?? item.itemProps?.label ?? itemProps.label"
    >
      <slot name="item" :item="item" :data="data" :index="index">
        <component :is="vnodeRenderer" v-if="item.render" :vnode="item.render(item.value, data)" />
        <template v-else>{{ item.value }}</template>
      </slot>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
  import { getByPath, isArray, isEmpty, isFunction, isObject, isUndefined } from '@daysnap/utils'
  import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
  import { computed, defineComponent } from 'vue'

  import {
    type VroElSchemaDescsItemField,
    vroElSchemaDescsProps,
    type VroElSchemaDescsSchema,
    type VroElSchemaDescsSlots,
  } from './types'

  defineOptions({ name: 'VroElSchemaDescs' })

  const props = defineProps(vroElSchemaDescsProps)
  defineSlots<VroElSchemaDescsSlots>()

  // 渲染 render 返回的 vnode
  const vnodeRenderer = defineComponent({
    name: 'VroElSchemaDescsVNode',
    props: {
      vnode: {
        type: null,
        required: true,
      },
    },
    setup(props) {
      return () => props.vnode
    },
  })

  // 取原始值：prop 取不到时回落到 value，再交给 get 预处理
  const getSourceValue = (field: VroElSchemaDescsItemField, data: Record<string, any>) => {
    const value = field.prop ? getByPath(data, field.prop, field.value) : field.value
    return isFunction(field.get) ? field.get(value, data) : value
  }

  // 展示值：依次处理枚举映射、格式化、单位、空值兜底
  const getDisplayValue = (
    field: VroElSchemaDescsItemField,
    value: any,
    data: Record<string, any>,
  ) => {
    if (field.map) {
      const mapValue = field.map[value]
      const mapValueKey = field.mapValueKey ?? 'label'
      if (!isUndefined(mapValue)) {
        value = mapValueKey && isObject(mapValue) ? mapValue[mapValueKey] : mapValue
      }
    }
    if (isFunction(field.formatter)) {
      value = field.formatter(value, data)
    }
    if (field.unit && !isEmpty(value)) {
      value = `${value}${field.unit}`
    }
    return isEmpty(value) ? (field.defaultValue ?? '-') : value
  }

  const metadata = computed(() => {
    const result: VroElSchemaDescsItemField[] = []

    // 分组、按数据源生成的项都拍平成一维描述项
    const collect = (schema: VroElSchemaDescsSchema) => {
      schema.forEach((field) => {
        if (isArray(field)) {
          collect(field)
          return
        }

        if (isFunction(field)) {
          collect(field(props.data))
          return
        }

        const sourceValue = getSourceValue(field, props.data)
        const hidden = isFunction(field.hidden)
          ? field.hidden(sourceValue, props.data)
          : field.hidden

        if (hidden) {
          return
        }

        result.push({ ...field, value: getDisplayValue(field, sourceValue, props.data) })
      })
    }

    collect(isFunction(props.schema) ? props.schema(props.data) : props.schema)

    return result
  })
</script>
