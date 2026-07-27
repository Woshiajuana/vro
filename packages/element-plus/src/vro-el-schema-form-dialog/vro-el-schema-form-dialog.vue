<template>
  <el-dialog
    v-model="visible"
    ref="dialogRef"
    class="vro-el-schema-form-dialog"
    :title="computedProps.title"
    destroy-on-close
    append-to-body
    :close-on-click-modal="false"
    :style="computedProps.style"
    @close="hide()"
    @closed="emit('closed')"
    @opened="resetScrollTop"
  >
    <vro-el-schema-form
      v-bind="schemaFormProps"
      ref="schemaFormRef"
      @change-field="emit('change-field', $event)"
      @input-field="emit('input-field', $event)"
      @submit.prevent="handleSubmit()"
    >
      <template v-for="name in forwardedSlotNames" #[name]="slotProps" :key="name">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>

      <slot></slot>
    </vro-el-schema-form>

    <template v-if="computedProps.showCancelButton || computedProps.showConfirmButton" #footer>
      <span class="dialog-footer">
        <el-button v-if="computedProps.showCancelButton" @click="hide('cancel')">
          {{ computedProps.cancelButtonText || t('schemaFormDialog.cancelText') }}
        </el-button>
        <el-button
          v-if="computedProps.showConfirmButton"
          type="primary"
          @click="handleSubmit"
          :loading="loading"
        >
          {{ computedProps.confirmButtonText || t('schemaFormDialog.confirmText') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { useAsyncTask, useVisible } from '@vrojs/use'
  import type { DialogInstance } from 'element-plus'
  import { ElButton, ElDialog } from 'element-plus'
  import { computed, provide, ref, useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import {
    VroElSchemaForm,
    type VroElSchemaFormInstance,
    vroElSchemaFormProps,
  } from '../vro-el-schema-form'
  import { vroElSchemaFormDialogInjectionKey } from './injection'
  import {
    type VroElSchemaFormDialogEmits,
    type VroElSchemaFormDialogProps,
    vroElSchemaFormDialogProps,
    type VroElSchemaFormDialogSlots,
  } from './types'

  defineOptions({ name: 'VroElSchemaFormDialog' })

  const emit = defineEmits<VroElSchemaFormDialogEmits>()
  const slots = defineSlots<VroElSchemaFormDialogSlots>()
  const props = defineProps(vroElSchemaFormDialogProps)
  const { t } = useLocale()
  const dynamicProps = ref<Partial<VroElSchemaFormDialogProps>>()
  const forwardedSlotNames = computed<string[]>(() => {
    return Object.keys(slots).filter((name) => name !== 'default')
  })
  const computedProps = computed<VroElSchemaFormDialogProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const schemaFormProps = computed(() => {
    const value = pick(computedProps.value, typedKeys(vroElSchemaFormProps))
    return {
      ...value,
      formProps: {
        ...value.formProps,
      },
    }
  })

  const { show, hide, confirm, visible } = useVisible<Partial<VroElSchemaFormDialogProps>, any>({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => emit('cancel', reason),
    confirmCallback: (data) => emit('confirm', data),
  })

  const dialogRef = useTemplateRef<DialogInstance>('dialogRef')
  const resetScrollTop = () => {
    const el = dialogRef.value?.$el
    const root = el instanceof Element ? el : undefined
    const body = root?.querySelector('.el-dialog__body') as HTMLElement | null
    body?.scrollTo({ top: 0 })
  }

  const schemaFormRef = useTemplateRef<VroElSchemaFormInstance>('schemaFormRef')
  const { loading, trigger: handleSubmit } = useAsyncTask(
    async () => {
      if (!schemaFormRef.value) {
        throw new Error('not found VroElSchemaForm')
      }
      await schemaFormRef.value.validate().catch(() => {
        throw 'cancel'
      })

      // 执行方法
      let isBlock = false
      await schemaFormRef.value.trigger({
        confirm,
        hide,
        block: () => {
          isBlock = true
        },
      })

      if (visible.value && !isBlock) {
        // 获取数据
        const data = await schemaFormRef.value.extractValues()
        const result =
          (await computedProps.value.request?.(data, computedProps.value.schema)) ?? data

        confirm(result)
      }
    },
    {
      throwError: true,
    },
  )

  provide(vroElSchemaFormDialogInjectionKey, {
    confirm,
    hide,
  })

  defineExpose({
    get elDialog() {
      return dialogRef.value!
    },
    get vroElSchemaForm() {
      return schemaFormRef.value!
    },
    show,
    hide,
  })
</script>
