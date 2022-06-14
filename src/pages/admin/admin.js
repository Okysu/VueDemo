import {
    createApp
} from 'vue';
import AdminBox from './AdminBox.vue';
import eventHub from './eventHub.js';
const App = createApp(AdminBox);
App.config.globalProperties.eventHub = eventHub;
App.mount('#app');