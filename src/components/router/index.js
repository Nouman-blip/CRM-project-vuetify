import Vue from 'vue';
import Router from 'vue-router';
import dashboardCompany from '../Dashboard/dashboardCompany.vue';
import ViewCompanies from '../Dashboard/companiesCrud.vue';
import loginForm from '../Login/loginForm.vue';


Vue.use(Router);

const routes = [
  { path: '/', component: loginForm },
  {path:'/dashboard',component:dashboardCompany},
  { path: '/companies', component: ViewCompanies },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
