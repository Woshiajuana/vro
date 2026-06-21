<template>
  <ElForm
    v-bind="formRestProps"
    class="vro-el-schema-form"
    ref="refForm"
    :model="model"
    :rules="rules"
  >
    <ElRow :gutter="16" v-bind="rowProps">
      <ElCol v-for="(item, key) in metadata" :key="key" v-bind="{ ...colProps, ...item.colProps }">
        <ElFormItem
          :label="item.label"
          :prop="key"
          v-bind="{ ...formItemProps, ...item.formItemProps }"
        >
          <Component
            v-model="item.value"
            v-bind="mapping?.[key]?.props"
            :is="mapping?.[key]?.is"
            ref="refComponents"
            @change="handleChange(key, $event)"
            @input="handleInput(key, $event)"
          >
            <template v-for="(slot, key) in item.slots" #[slot] :key="slot">
              <slot :name="key" :item="item" />
            </template>
          </Component>
        </ElFormItem>
      </ElCol>
      <slot></slot>
    </ElRow>
  </ElForm>
</template>

<script setup lang="ts">
  import banana from '@daysnap/banana'
  import { filterEmptyValue, isFunction, isString, pick } from '@daysnap/utils'
  import { ElCol, ElForm, ElFormItem, ElRow, formProps } from 'element-plus'
  import { computed, ref, useTemplateRef, watchEffect } from 'vue'

  import { datePickerValueFormat } from '../utils'
  import { useVroElConfig } from '../vro-el-config-provider'
  import { defineVroElSchemaFormFieldTrigger } from './defineVroElSchemaFormFieldTrigger'
  import { vroElSchemaFormProps, type VroElSchemaFormSchema } from './types'
  import { vroElSchemaFormFieldManager } from './vroElSchemaFormFieldManager'

  defineOptions({ name: 'VroElSchemaForm' })

  const emit = defineEmits(['change-field', 'input-field'])
  const props = defineProps(vroElSchemaFormProps)

  const formRestProps = computed(() => {
    return pick(props, Object.keys(formProps) as any)
  })

  const vec = useVroElConfig()

  // 规则
  const rules = ref<Record<string, any>>({})
  const model = ref<Record<string, any>>({})
  const metadata = ref<VroElSchemaFormSchema>({})

  watchEffect(() => {
    const { schema } = props
    metadata.value = {}
    Object.entries(schema).forEach(([key, item]) => {
      // eslint-disable-next-line prefer-const
      let { hidden, value, rules: itemRules, is } = item

      if (isFunction(hidden)) {
        hidden = hidden(value, item, schema)
      }
      if (!is) {
        hidden = true
      }
      if (!hidden) {
        model.value[key] = value
        metadata.value[key] = item
      }

      if (isFunction(rules)) {
        rules.value = rules(value, item, schema)
      }
      rules.value[key] = itemRules
    })
  })

  const mapping = computed(() => {
    return Object.entries(metadata.value).reduce<Record<string, any>>((res, [key, item]) => {
      // eslint-disable-next-line prefer-const
      let { props = {}, is, options, labelKey, valueKey } = item
      if (isString(is)) {
        const data = vroElSchemaFormFieldManager.get(is)
        if (data) {
          let loc: Record<string, any> = {}
          if (isString(is)) {
            loc = (vec.locale.schemaForm as any)[is]
          }

          if (is === 'ElDatePicker') {
            props.valueFormat = datePickerValueFormat[props?.type ?? 'date']
          }
          is = data.is
          props = Object.assign(
            {},
            data.props,
            loc,
            filterEmptyValue({ options, labelKey, valueKey }),
            props,
          )

          if (props.disabled) {
            props.placeholder = '-'
            if (is === 'ElDatePicker') {
              props.startPlaceholder = '-'
              props.endPlaceholder = '-'
            }
          }
        }
      }
      res[key] = { is, props }
      return res
    }, {})
  })

  // 事件
  const handleChange = async (key: string, value: any) => {
    emit('change-field', { key, value })
    await props.schema[key]?.onChange?.(value, props.schema[key], props.schema)
  }
  const handleInput = async (key: string, value: any) => {
    emit('input-field', { key, value })
    await props.schema[key]?.onInput?.(value, props.schema[key], props.schema)
  }

  // 校验
  const refComponents = useTemplateRef<any[]>('refComponents')
  const refForm = useTemplateRef('refForm')
  const validate = async () => {
    const instances = refComponents.value?.filter((item) => isFunction(item.validate)) ?? []
    await Promise.all([refForm.value, ...instances].map((item) => item?.validate()))
  }

  // 获取值 这里返回异步函数 为以后可能会做校验做准备
  const extractValues = async () => {
    const instances = refComponents.value?.filter((item) => isFunction(item.extractValues)) ?? []
    const results = await Promise.all<Record<string, any>[]>(
      instances.map((item) => item.extractValues()),
    )
    results.push(banana.extract(props.schema as any))
    return results.filter(Boolean).reduce<Record<string, any>>((res, item) => {
      return { ...res, ...item }
    }, {})
  }

  // 触发执行子组件的 trigger 事件
  const trigger = defineVroElSchemaFormFieldTrigger(async (ctx) => {
    const instances = refComponents.value?.filter((item) => isFunction(item.trigger)) ?? []
    await Promise.all(instances.map((item) => item.trigger(ctx)))
  })

  defineExpose({
    get formInstance() {
      return refForm.value!
    },
    validate,
    resetFields: () => refForm.value?.resetFields(),
    trigger,
    extractValues,
    validateField: async (key: string) => {
      return refForm.value?.validateField(key)
    },
  })
</script>
