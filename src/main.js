import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

const app = createApp(App)

//alterando formato da data
app.config.globalProperties.$filters = {
    currency(value) {
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
        return formatter.format(value);
    },

    date(value) {
        return moment(value).format('D/MM/yyyy');
    }
  }

  

createApp(App).use(store).use(router).mount('#app')
