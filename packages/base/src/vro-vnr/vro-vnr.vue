<script lang="ts">
  import { defineComponent } from 'vue'

  import { vroVnrProps } from './types'

  export default defineComponent({
    name: 'VroVnr',
    props: vroVnrProps,
    setup(props) {
      return () => props.nodes
    },
  })
</script>
