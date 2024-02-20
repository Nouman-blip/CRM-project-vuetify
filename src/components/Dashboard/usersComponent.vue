<!-- src/components/Views/Users.vue -->
<template>
    <v-container>
      <sideBarComapnyVue />
  
      <!-- Add New User Button -->
      <v-row class="mb-4">
        <v-col>
          <v-btn @click="openAddUserModal" color="primary">Add New User</v-btn>
        </v-col>
      </v-row>
  
      <!-- Users Data Table -->
      <v-data-table :items="users" :headers="headers">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ getCompanyName(item.company) }}</td>
            <td>{{ getDepartmentName(item.department) }}</td>
            <td>
              <!-- Kebab Menu -->
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editUser(item)">
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteUser(item)">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </template>
      </v-data-table>
  
      <!-- Add New User Modal -->
      <v-dialog v-model="modalOpen" max-width="500px">
        <v-card>
          <v-card-title class="headline mb-2" v-if="editingUser">
            Edit User - {{ editingUser.name }}
          </v-card-title>
          <v-card-title class="headline mb-2" v-else>
            User Registration
          </v-card-title>
          <v-card-text>
            <usersForm :initialUser="editingUser" @user-registered="saveUser" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import sideBarComapnyVue from './sideBarComapny.vue';
  import usersForm from '../views/usersForm.vue';
  
  export default {
    components: {
      sideBarComapnyVue,
      usersForm,
    },
    data() {
      return {
        modalOpen: false,
        users: [],
        companyOptions: JSON.parse(localStorage.getItem("companies")) || [],
        departmentOptions: JSON.parse(localStorage.getItem("departments")) || [],
        editingUser: null,
        modalTitle: 'Add New User',
        submitButtonLabel: 'Add User',
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Company', value: 'company' },
          { text: 'Department', value: 'department' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      };
    },
    methods: {
      openAddUserModal() {
        this.modalTitle = 'Add New User';
        this.submitButtonLabel = 'Add User';
        this.editingUser=null,
        this.modalOpen = true;
      },
      editUser(item) {
        this.modalTitle = 'Edit User';
        this.submitButtonLabel = 'Save Changes';
        this.editingUser = item;
        this.modalOpen = true;
      },
      deleteUser(item) {
        // Delete the user from the array
        this.users = this.users.filter(emp => emp !== item);
        // Save the updated users array to localStorage
        this.saveUsersToLocalStorage(this.users);
      },
      saveUser(user) {
        let updatedUsers = this.users.slice();
  
        if (this.editingUser) {
          const index = updatedUsers.findIndex((emp) => emp.id === this.editingUser.id);
          if (index !== -1) {
            updatedUsers.splice(index, 1, user);
          }
        } else {
          user.id = Date.now();
          updatedUsers.push(user);
        }
  
        this.saveUsersToLocalStorage(updatedUsers);
        this.fetchUsers();
        this.modalOpen = false;
      },
      fetchUsers() {
        this.users = this.getUsersFromLocalStorage();
      },
      getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem("users")) || [];
      },
      saveUsersToLocalStorage(users) {
        localStorage.setItem("users", JSON.stringify(users));
      },
      getCompanyName(companyId) {
        const company = this.companyOptions.find(company => company.id === companyId);
        return company ? company.name : 'Unknown';
      },
      getDepartmentName(departmentId) {
        const department = this.departmentOptions.find(department => department.id === departmentId);
        return department ? department.name : 'Unknown';
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style>
    /* Add your styling as needed */
  </style>
  