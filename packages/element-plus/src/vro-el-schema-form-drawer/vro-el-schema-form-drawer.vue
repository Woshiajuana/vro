<template>
  <el-drawer
    v-model="visible"
    ref="drawerRef"
    class="vro-el-schema-form-drawer"
    :title="computedProps.title"
    :direction="computedProps.direction"
    :size="computedProps.size"
    :with-header="computedProps.withHeader"
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
      <div class="vro-el-schema-form-drawer-footer">
        <el-button v-if="computedProps.showCancelButton" @click="hide('cancel')">
          {{ computedProps.cancelButtonText || t('schemaFormDrawer.cancelText') }}
        </el-button>
        <el-button
          v-if="computedProps.showConfirmButton"
          type="primary"
          @click="handleSubmit"
          :loading="loading"
        >
          {{ computedProps.confirmButtonText || t('schemaFormDrawer.confirmText') }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { pick, typedKeys } from '@daysnap/utils'
  import { useAsyncTask, useVisible } from '@vrojs/use'
  import type { DrawerInstance } from 'element-plus'
  import { ElButton, ElDrawer } from 'element-plus'
  import { computed, provide, ref, useTemplateRef } from 'vue'

  import { useLocale } from '../locale'
  import {
    VroElSchemaForm,
    type VroElSchemaFormInstance,
    vroElSchemaFormProps,
  } from '../vro-el-schema-form'
  import { vroElSchemaFormDrawerInjectionKey } from './injection'
  import type {
    VroElSchemaFormDrawerEmits,
    VroElSchemaFormDrawerProps,
    VroElSchemaFormDrawerSlots,
  } from './types'
  import { vroElSchemaFormDrawerProps } from './types'

  defineOptions({ name: 'VroElSchemaFormDrawer' })

  const emit = defineEmits<VroElSchemaFormDrawerEmits>()
  const slots = defineSlots<VroElSchemaFormDrawerSlots>()
  const props = defineProps(vroElSchemaFormDrawerProps)
  const { t } = useLocale()
  const dynamicProps = ref<Partial<VroElSchemaFormDrawerProps>>()
  const forwardedSlotNames = computed<string[]>(() => {
    return Object.keys(slots).filter((name) => name !== 'default')
  })
  const computedProps = computed<VroElSchemaFormDrawerProps>(() => {
    return Object.assign({}, props, dynamicProps.value)
  })
  const schemaFormProps = computed(() => {
    return pick(computedProps.value, typedKeys(vroElSchemaFormProps))
  })

  const { show, hide, confirm, visible } = useVisible<Partial<VroElSchemaFormDrawerProps>, any>({
    showCallback: (options) => {
      dynamicProps.value = options
    },
    hideCallback: (reason) => emit('cancel', reason),
    confirmCallback: (data) => emit('confirm', data),
  })

  const drawerRef = useTemplateRef<DrawerInstance>('drawerRef')
  const resetScrollTop = () => {
    const el = drawerRef.value?.$el
    const root = el instanceof Element ? el : undefined
    const body = root?.querySelector('.el-drawer__body') as HTMLElement | null
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

      let isBlock = false
      await schemaFormRef.value.trigger({
        confirm,
        hide,
        block: () => {
          isBlock = true
        },
      })

      if (visible.value && !isBlock) {
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

  provide(vroElSchemaFormDrawerInjectionKey, {
    confirm,
    hide,
  })

  defineExpose({
    get elDrawer() {
      return drawerRef.value!
    },
    get vroElSchemaForm() {
      return schemaFormRef.value!
    },
    show,
    hide,
  })
</script>
