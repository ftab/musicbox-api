import './assets/css/main.css'
import { startVersionCheck } from './version';

import { createApp } from 'vue';
import router from './router';
import { error } from './state';
import App from './App.vue';
import VueAwesomePaginate from 'vue-awesome-paginate';

const app = createApp(App)

startVersionCheck();

app.config.errorHandler = err => {
    error.value = err;

    if(import.meta.env.DEV) {
        console.error(err);
    }
};

app.use(router)
    .use(VueAwesomePaginate)
    .mount('#app');
