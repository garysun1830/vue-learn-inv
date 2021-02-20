/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import { Switch, Button, Field } from 'mint-ui';
import 'mint-ui/lib/style.css'
// router setup
import routes from './routes/routes'
import './registerServiceWorker'
// import config from "./vue.config";
import moment from 'moment'

// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.component(Switch.name, Switch);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);

// configure router
const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'nav-item active',
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash }
        } else {
            return { x: 0, y: 0 }
        }
    }
})

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

Vue.filter('formatCurrency', function (value) {
    return value ? `${formatter.format(value)}` : value;
})

// Vue.filter('formatDate', function (value) {
//     return value ? moment(String(value)).format('YYYY/MM/DD') : value;
// });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    // vuetify: new Vuetify(),
    render: h => h(App),
    router,
})