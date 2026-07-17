<template>
  <el-dialog
    v-model="visible"
    ref="containerRef"
    class="vro-el-schema-form-dialog"
    :id="id"
    :title="computedProps.title"
    destroy-on-close
    append-to-body
    :close-on-click-modal="false"
    :style="computedProps.style"
    @close="hide()"
    @closed="$emit('closed')"
  >
    <vro-el-schema-form
      v-bind="schemaFormProps"
      ref="refVroElSchemaForm"
      @change-field="$emit('change-field', $event)"
      @input-field="$emit('input-field', $event)"
      @submit.prevent="handleSubmit()"
    >
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
  import { getRandom, pick } from '@daysnap/utils'
  import { useAsyncTask, useId, useVisible } from '@vrojs/use'
  import { ElButton, ElDialog } from 'element-plus'
  import { computed, nextTick, provide, ref, useTemplateRef, watch } from 'vue'

  import { useLocale } from '../locale'
  import { VroElSchemaForm, vroElSchemaFormProps } from '../vro-el-schema-form'
  import { vroElSchemaFormDialogInjectionKey } from './injection'
  import { type VroElSchemaFormDialogProps, vroElSchemaFormDialogProps } from './types'

  defineOptions({ name: 'VroElSchemaFormDialog' })

  const emit = defineEmits(['change-field', 'input-field', 'cancel', 'confirm', 'closed'])

  const props = defineProps(vroElSchemaFormDialogProps)
  const { t } = useLocale()
  const dynamicProps = ref<Partial<VroElSchemaFormDialogProps>>()
  const computedProps = computed<VroElSchemaFormDialogProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const schemaFormProps = computed(() => {
    const value = pick(computedProps.value, Object.keys(vroElSchemaFormProps) as any)
    return {
      ...value,
      formProps: {
        labelPosition: computedProps.value.labelPosition,
        labelWidth: computedProps.value.labelWidth,
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

  const id = useId()
  watch(visible, (v) => {
    if (v) {
      nextTick(() => {
        const el = document.getElementById(id)
        if (el) {
          el.parentElement!.scrollTop = 0
        }
      })
    }
  })

  const refVroElSchemaForm = useTemplateRef('refVroElSchemaForm')
  const { loading, trigger: handleSubmit } = useAsyncTask(
    async () => {
      if (!refVroElSchemaForm.value) {
        throw new Error('not fond VroElSchemaForm')
      }
      await refVroElSchemaForm.value.validate().catch(() => {
        throw 'cancel'
      })

      // 执行方法
      let isBlock = false
      await refVroElSchemaForm.value.trigger({
        confirm,
        hide,
        block: () => {
          isBlock = true
          setTimeout(() => (isBlock = true))
        },
      })

      if (visible.value && !isBlock) {
        // 获取数据
        const data = await refVroElSchemaForm.value.extractValues()
        const result = (await computedProps.value.request?.(data, props.schema!)) ?? data

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
    get vroElSchemaForm() {
      return refVroElSchemaForm.value!
    },
    show,
    hide,
  })
</script>
