import { createApp } from 'vue';
import router from './router';
import { error } from './state';
import App from './App.vue';
import VueAwesomePaginate from 'vue-awesome-paginate';

const app = createApp(App)

app.config.errorHandler = err => {
    error.value = err;
};

app.use(router)
    .use(VueAwesomePaginate)
    .mount('#app');
