import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import VueAwesomePaginate from "vue-awesome-paginate";

createApp(App)
    .use(router)
    .use(VueAwesomePaginate)
    .mount('#app');
