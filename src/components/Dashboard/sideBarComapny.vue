<!-- src/components/Sidebar.vue -->
<template>
  <v-container>
    <v-toolbar :class="{ 'indigo': true }" :style="{ width: isDrawerOpen ? 'calc(100% - 300px)' : '100%' }">
        <v-btn icon @click="drawer=!drawer">
         <v-icon class="white--text">mdi-menu</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">
          CRM System
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="navigate('/')">
          <v-icon class="white--text">mdi-logout</v-icon>
        </v-btn>
      </v-toolbar>

  <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" class="sidebar" color="primary">
    <!-- User Avatar and Name -->
    <v-list-item class="user-info" @click="navigate('/profile')">
      <v-avatar size="36">
        <v-img src="../../assets/person.jpg" alt="User Pic"></v-img>
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title class="user-name white--text">John Doe</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Additional Navigation Links with Icons -->
    <v-list dense>
      <v-list-item link to="/dashboard">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/companies">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-domain</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">Companies</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Departments Link -->
      <v-list-item link to="/companies/departments">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-office-building-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">Departments</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</v-container>
</template>

<style scoped>
.user-info {
  cursor: pointer;
}

.user-name {
  margin-left: 8px;
}

.sidebar {
  background-color: #212121;
  color: white;
}

.toggle-sidebar-btn:hover {
  background-color: #1976D2; /* Change background color on hover */
}
</style>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: false,
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
    toggleMini() {
      this.mini = !this.mini;
    },
  },
};
</script>
