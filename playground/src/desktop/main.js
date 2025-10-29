import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

createApp(App).use(router).mount('#app')
