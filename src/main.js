// Import Global Styles
import './assets/styles/main.scss'; // Import main SCSS that includes variables, mixins, base styles

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Create Vue application instance
const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Use plugins
app.use(pinia);
app.use(router);

// Mount app to the DOM
app.mount('#app');
