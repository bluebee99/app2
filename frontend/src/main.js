import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { msalInstance } from './msal';

msalInstance.initialize().then(() => {
  createApp(App).use(router).mount('#app');
}).catch(error => {
  console.error("MSAL initialization failed:", error);
});
