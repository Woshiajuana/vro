<template>
  <div>
    <h2>Parent</h2>

    <ul>
      <li>{{ count }}</li>
      <li><button @click="count++">+1</button></li>
      <li>{{ Date.now() }}</li>

      <li>
        <ChildA></ChildA>
      </li>
      <li>
        <ChildB></ChildB>
      </li>
    </ul>

    <dl>
      <dt>测试Watch</dt>
      <dd>{{ obj.count }}</dd>
      <dd><button @click="obj.count++">+1</button></dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'

  import ChildA from './ChildA.vue'
  import ChildB from './ChildB.vue'

  const count = ref(0)

  const obj = reactive({ count: 0 })

  watch(
    () => obj.count,
    (newValue, oldValue) => {
      console.log('newValue => ', newValue)
      console.log('oldValue => ', oldValue)
      // 在嵌套的属性变更时触发
      // 注意：`newValue` 此处和 `oldValue` 是相等的
      // 因为它们是同一个对象！
    },
  )

  obj.count++
</script>

<style lang="scss" scoped>
  // @use '@/assets/scss/define.scss' as *;
</style>
