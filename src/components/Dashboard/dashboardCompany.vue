<!-- src/App.vue -->
<template>
  <v-app>
    <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline">Welcome to the Dashboard</v-card-title>
          <v-card-subtitle>Explore your company insights here.</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    <sideBarComapny/>
    
  </v-app>
</template>

<script>
import sideBarComapny from './sideBarComapny.vue'


export default {
  components: {
    sideBarComapny,
  },
};
</script>
<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-subtitle {
  font-size: 16px;
  color: #757575;
}
</style>