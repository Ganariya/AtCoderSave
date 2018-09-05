import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import routes from './routes.js';

Vue.use(Buefy);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    router,
    render(h) {
        return h('router-view');
    },
}).$mount('#app');

