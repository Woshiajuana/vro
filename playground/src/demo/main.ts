import { createApp } from 'vue'

import App from './App.vue'
import DemoBlock from './components/DemoBlock.vue'
import { router } from './router'

const app = createApp(App)

app.use(router)
app.component('DemoBlock', DemoBlock)

app.mount('#app')
