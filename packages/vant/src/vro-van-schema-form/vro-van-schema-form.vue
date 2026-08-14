<template>
  <div class="vro-van-schema-form">
    <vro-van-cell-group v-bind="cellGroupProps">
      <component
        v-for="(item, key) in metadata"
        v-model="item.value"
        v-bind="mapping?.[key]?.props"
        :is="mapping?.[key]?.is"
        :key="key"
        ref="componentRefs"
        @change="handleChange(key, $event)"
        @input="handleInput(key, $event)"
      >
        <template
          v-for="{ source, target } in getSlotEntries(item.slots)"
          #[target]="slotProps"
          :key="target"
        >
          <slot :name="source" v-bind="slotProps ?? {}" :item="item" />
        </template>
      </component>
      <slot></slot>
    </vro-van-cell-group>
  </div>
</template>

<script setup lang="ts">
  import { filterEmptyValue, isArray, isEmpty, isFunction, isString } from '@daysnap/utils'
  import { getSlotEntries } from '@vrojs/base'
  import { showToast } from 'vant'
  import { computed, ref, useTemplateRef, watchEffect } from 'vue'

  import { useLocale } from '../locale'
  import { VroVanCellGroup } from '../vro-van-cell-group'
  import { defineVroVanSchemaFormFieldTrigger } from './defineVroVanSchemaFormFieldTrigger'
  import {
    type VroVanSchemaFormEmits,
    vroVanSchemaFormProps,
    type VroVanSchemaFormRule,
    type VroVanSchemaFormSchema,
    type VroVanSchemaFormSlots,
  } from './types'
  import { vroVanSchemaFormFieldManager } from './vroVanSchemaFormFieldManager'

  defineOptions({ name: 'VroVanSchemaForm' })

  const emit = defineEmits<VroVanSchemaFormEmits>()
  defineSlots<VroVanSchemaFormSlots>()
  const props = defineProps(vroVanSchemaFormProps)

  const { locale } = useLocale()

  const metadata = ref<VroVanSchemaFormSchema>({})

  watchEffect(() => {
    const { schema } = props
    metadata.value = {}

    Object.entries(schema).forEach(([key, item]) => {
      // eslint-disable-next-line prefer-const
      let { hidden, value, is } = item

      if (isFunction(hidden)) {
        hidden = hidden(value, item, schema)
      }
      if (!is) {
        hidden = true
      }
      if (!hidden) {
        metadata.value[key] = item
      }
    })
  })

  const mapping = computed(() => {
    return Object.entries(metadata.value).reduce<Record<string, any>>((res, [key, item]) => {
      // eslint-disable-next-line prefer-const
      let { is, options, labelKey, valueKey } = item
      let fieldProps = { ...item.props } as Record<string, any>

      if (isString(is)) {
        const data = vroVanSchemaFormFieldManager.get(is)
        const loc = (locale.value.van.schemaForm as any)?.[is] ?? {}

        if (data) {
          fieldProps = Object.assign(
            {},
            data.props,
            loc,
            filterEmptyValue({ options, labelKey, valueKey, label: item.label }),
            fieldProps,
          )
          is = data.is
        } else {
          fieldProps = Object.assign(
            {},
            loc,
            filterEmptyValue({ options, labelKey, valueKey, label: item.label }),
            fieldProps,
          )
        }
      }

      res[key] = { is, props: fieldProps }
      return res
    }, {})
  })

  const componentRefs = useTemplateRef<any[]>('componentRefs')

  const normalizeRules = (rules: VroVanSchemaFormRule | VroVanSchemaFormRule[] | undefined) => {
    return isArray(rules) ? rules : rules ? [rules] : []
  }

  const validate = async () => {
    const instances = componentRefs.value?.filter((item) => isFunction(item.validate)) ?? []
    await Promise.all(instances.map((item) => item.validate()))

    for (const item of Object.values(metadata.value)) {
      let rules = item.rules

      if (isFunction(rules)) {
        rules = rules(item.value, item, props.schema)
      }

      for (const rule of normalizeRules(rules)) {
        if (rule.required && isEmpty(item.value)) {
          throw showValidateMessage(rule.message)
        }

        if (rule.validator) {
          const result = await rule.validator(item.value, item, props.schema)

          if (result === false || isString(result) || result instanceof Error) {
            throw showValidateMessage(
              isString(result) ? result : result instanceof Error ? result.message : rule.message,
            )
          }
        }
      }
    }
  }

  const resetFields = () => {
    Object.values(props.schema).forEach((item) => {
      item.value = item.resetValue ?? item.defaultValue
    })
  }

  const extractValues = async () => {
    const instances = componentRefs.value?.filter((item) => isFunction(item.extractValues)) ?? []
    const results = await Promise.all<Record<string, any>[]>(
      instances.map((item) => item.extractValues()),
    )

    results.push(
      Object.entries(props.schema).reduce<Record<string, any>>((res, [key, item]) => {
        res[key] = item.get ? item.get(item.value, item, props.schema) : item.value
        return res
      }, {}),
    )

    return results.filter(Boolean).reduce<Record<string, any>>((res, item) => {
      return { ...res, ...item }
    }, {})
  }

  const showValidateMessage = (message?: string) => {
    const err = message || ''

    if (err) {
      showToast(err)
    }

    return err
  }

  const trigger = defineVroVanSchemaFormFieldTrigger(async (ctx) => {
    const instances = componentRefs.value?.filter((item) => isFunction(item.trigger)) ?? []
    await Promise.all(instances.map((item) => item.trigger(ctx)))
  })

  const handleChange = async (key: string, value: any) => {
    emit('change-field', { key, value })
    await props.schema[key]?.onChange?.(value, props.schema[key], props.schema)
  }

  const handleInput = async (key: string, value: any) => {
    emit('input-field', { key, value })
    await props.schema[key]?.onInput?.(value, props.schema[key], props.schema)
  }

  defineExpose({
    validate,
    resetFields,
    trigger,
    extractValues,
  })
</script>
