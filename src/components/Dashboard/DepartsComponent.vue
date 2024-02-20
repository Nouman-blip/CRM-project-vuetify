<template>
  <v-container>
    <sideBarComapnyVue/>

    <!-- Add New Department Button -->
    <v-row class="mb-4">
      <v-col>
        <v-btn @click="openAddDepartmentModal" color="primary">Add New Department</v-btn>
      </v-col>
    </v-row>

    <!-- Departments Data Table -->
    <v-data-table :items="departments" :headers="headers" @row-click="editDepartment">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ getCompanyName(item.company) }}</td>
          <td>
            <!-- Kebab Menu -->
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editDepartment(item)">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteDepartment(item)">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Add New Department Modal -->
    <v-dialog v-model="modalOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline mb-2" v-if="editingDepartment">
          Edit Department - {{ editingDepartment.name }}
        </v-card-title>
        <v-card-title class="headline mb-2" v-else>
          Department Registration
        </v-card-title>
        <v-card-text>
          <DepartsForm :initialDepartment="editingDepartment" @department-registered="saveDepartment" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import sideBarComapnyVue from './sideBarComapny.vue';
import DepartsForm from '../views/departsForm.vue';

export default {
  components: {
    sideBarComapnyVue,
    DepartsForm,
  },
  data() {
    return {
      modalOpen: false,
      departments: [],
      editingDepartment: null,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Company', value: 'company' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      companyOptions: JSON.parse(localStorage.getItem("companies")) || [],
    };
  },
  methods: {
    openAddDepartmentModal() {
      this.editingDepartment = null;
      this.modalOpen = true;
    },
    editDepartment(item) {
      this.editingDepartment = item;
      this.modalOpen = true;
    },
    deleteDepartment(item) {
      const updatedDepartments = this.departments.filter((department) => department.id !== item.id);
      this.saveDepartmentsToLocalStorage(updatedDepartments);
      this.fetchDepartments();
    },
    saveDepartment(department) {
      let updatedDepartments = this.departments.slice();

      if (this.editingDepartment) {
        const index = updatedDepartments.findIndex((dep) => dep.id === this.editingDepartment.id);
        if (index !== -1) {
          updatedDepartments.splice(index, 1, department);
        }
      } else {
        department.id = Date.now();
        updatedDepartments.push(department);
      }

      this.saveDepartmentsToLocalStorage(updatedDepartments);
      this.fetchDepartments();
      this.modalOpen = false;
    },
    fetchDepartments() {
      this.departments = this.getDepartmentsFromLocalStorage();
    },
    getDepartmentsFromLocalStorage() {
      return JSON.parse(localStorage.getItem("departments")) || [];
    },
    saveDepartmentsToLocalStorage(departments) {
      localStorage.setItem("departments", JSON.stringify(departments));
    },
    getCompanyName(companyId) {
      const company = this.companyOptions.find(company => company.id === companyId);
      return company ? company.name : 'Unknown';
    },
  },
  mounted() {
    this.fetchDepartments();
  },
};
</script>

<style>
/* Add your styling as needed */
</style>
