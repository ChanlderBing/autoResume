import { createApp } from 'vue'
import '@/styles/element/index.scss'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import print from 'vue3-print-nb'

createApp(App).use(store).use(router).use(print).use(ElementPlus).mount('#app')
