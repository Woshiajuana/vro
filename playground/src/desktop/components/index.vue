<template>
  <div class="van-doc">
    <DocHeader />
    <DocNav />
    <DocContainer>
      <DocContent>
        <slot />
      </DocContent>
    </DocContainer>
    <DocSimulator :src="simulator" />
  </div>
</template>

<script setup lang="ts">
  import DocContainer from './Container.vue'
  import DocContent from './Content.vue'
  import DocHeader from './Header.vue'
  import DocNav from './Nav.vue'
  import DocSimulator from './Simulator.vue'

  defineProps<{
    simulator: string
  }>()
</script>
