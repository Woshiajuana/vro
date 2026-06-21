<template>
  <ElDialog
    v-model="visible"
    class="vro-el-schema-form-dialog"
    :class="[id]"
    ref="containerRef"
    :title="computedProps.title"
    destroy-on-close
    append-to-body
    :close-on-click-modal="false"
    :style="computedProps.style"
    @close="hide()"
    @closed="$emit('closed')"
  >
    <VroElSchemaForm
      v-bind="schemaFormProps"
      ref="refVroElSchemaForm"
      @change-field="$emit('change-field', $event)"
      @input-field="$emit('input-field', $event)"
      @submit.prevent="handleSubmit()"
    >
      <slot></slot>
    </VroElSchemaForm>

    <template v-if="computedProps.showCancelButton || computedProps.showConfirmButton" #footer>
      <span class="dialog-footer">
        <ElButton v-if="computedProps.showCancelButton" @click="hide('cancel')">
          {{ computedProps.cancelButtonText || '取消' }}
        </ElButton>
        <ElButton
          v-if="computedProps.showConfirmButton"
          type="primary"
          @click="handleSubmit"
          :loading="loading"
        >
          {{ computedProps.confirmButtonText || '确认' }}
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { getRandom, pick } from '@daysnap/utils'
  import { useAsyncTask, useVisible } from '@vrojs/use'
  import { ElButton, ElDialog } from 'element-plus'
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onUnmounted,
    provide,
    ref,
    useTemplateRef,
    watch,
  } from 'vue'

  import { VroElSchemaForm, vroElSchemaFormProps } from '../vro-el-schema-form'
  import { vroElSchemaFormDialogInjectionKey } from './injection'
  import { type VroElSchemaFormDialogProps, vroElSchemaFormDialogProps } from './types'

  defineOptions({ name: 'VroElSchemaFormDialog' })

  const emit = defineEmits(['change-field', 'input-field', 'cancel', 'confirm', 'closed'])

  const props = defineProps(vroElSchemaFormDialogProps)
  const dynamicProps = ref<Partial<VroElSchemaFormDialogProps>>()
  const computedProps = computed<VroElSchemaFormDialogProps>(() =>
    Object.assign({}, props, dynamicProps.value),
  )
  const schemaFormProps = computed(() => {
    return pick(computedProps.value, Object.keys(vroElSchemaFormProps) as any)
  })

  onBeforeUnmount(() => console.log('dialog 即将销毁'))
  onUnmounted(() => console.log('dialog 销毁了'))

  const { show, hide, confirm, visible } = useVisible<Partial<VroElSchemaFormDialogProps>, any>({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => emit('cancel', reason),
    confirmCallback: (data) => emit('confirm', data),
  })

  const id = `id_${getRandom(10)}`
  watch(visible, (v) => {
    if (v) {
      nextTick(() => {
        const els = document.querySelectorAll(`.${id}`)
        if (els.length) {
          els.forEach((el) => (el.parentElement!.scrollTop = 0))
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
    get schemaFormInstance() {
      return refVroElSchemaForm.value!
    },
    show,
    hide,
  })
</script>
