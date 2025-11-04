import 'vant/es/toast/style'
import 'vant/es/dialog/style'

import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router.js'

createApp(App).use(router).mount('#app')
