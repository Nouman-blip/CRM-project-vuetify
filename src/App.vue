<template>
  <v-app>
    <v-main>
      <router-view>
        <loginForm/>
        <dashboardCompany/>
      </router-view>
    </v-main>
  </v-app>

</template>

<script>

import loginForm from './components/Login/loginForm.vue';
import dashboardCompany from './components/Dashboard/dashboardCompany.vue';


export default {
  name: 'App',
  components: {
    loginForm,
    dashboardCompany,
  },
  data() {
    return {

    };
  },
};
</script>



