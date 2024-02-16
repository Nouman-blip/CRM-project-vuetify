<!-- src/components/Sidebar.vue -->
<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" class="sidebar" color="primary">
    <!-- User Avatar and Name -->
    <v-list-item class="user-info" @click="navigate('/profile')">
      <v-avatar size="36">
        <v-img src="../../assets/person.jpg" alt="User Pic"></v-img>
      </v-avatar>
      <v-list-item-content>
        <v-list-item-title class="user-name">John Doe</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Additional Navigation Links with Icons -->
    <v-list dense>
      <v-list-item link to="/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/companies">
        <v-list-item-icon>
          <v-icon>mdi-view-list</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Companies</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
 
    </v-list>
  </v-navigation-drawer>
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
