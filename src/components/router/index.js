import Vue from 'vue';
import Router from 'vue-router';
import dashboardCompany from '../Dashboard/dashboardCompany.vue';
import ViewCompanies from '../Dashboard/companiesCrud.vue';
import loginForm from '../Login/loginForm.vue';
import DepartsComponent from '../Dashboard/DepartsComponent.vue'


Vue.use(Router);

const routes = [
  { path: '/', component: loginForm },
  {path:'/dashboard',component:dashboardCompany},
  { path: '/companies', component: ViewCompanies },
  { path: '/companies/departments', component: DepartsComponent },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
