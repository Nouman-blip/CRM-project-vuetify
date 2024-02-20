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
    <v-data-table :items="departments" :headers="headers">
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
        <v-card-title class="headline mb-2">{{ modalTitle }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitAction">
            <v-text-field v-model="editingDepartment.name" label="Department Name"></v-text-field>
            <v-textarea v-model="editingDepartment.description" label="Department Description"></v-textarea>
            <v-select
              v-model="editingDepartment.company"
              :items="companyOptions"
              label="Select Company"
              item-text="name"
              item-value="id"
            ></v-select>
            <v-btn type="submit" color="primary">{{ submitButtonLabel }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import sideBarComapnyVue from './sideBarComapny.vue';

export default {
  components: {
    sideBarComapnyVue,
  },
  data() {
    return {
      modalOpen: false,
      editingDepartment: {
        id: null,
        name: '',
        description: '',
        company: null,
      },
      departments: this.getDepartmentsFromLocalStorage(),
      companyOptions: JSON.parse(localStorage.getItem("companies")) || [],
      modalTitle: 'Add New Department',
      submitButtonLabel: 'Add Department',
      headers: [ // Define your headers here
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Company', value: 'company' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    openAddDepartmentModal() {
      this.modalTitle = 'Add New Department';
      this.submitButtonLabel = 'Add Department';
      this.editingDepartment = {
        id: null,
        name: '',
        description: '',
        company: null,
      };
      this.modalOpen = true;
    },
    editDepartment(item) {
      this.modalTitle = 'Edit Department';
      this.submitButtonLabel = 'Save Changes';
      this.editingDepartment = { ...item };
      this.modalOpen = true;
    },
    deleteDepartment(item) {
      // Delete the department from the array
      this.departments = this.departments.filter(dep => dep !== item);
      // Save the updated departments array to localStorage
      this.saveDepartmentsToLocalStorage(this.departments);
    },
    submitAction() {
      if (this.submitButtonLabel === 'Add Department') {
        // Add a new department
        this.departments.push({ ...this.editingDepartment });
      } else {
        // Edit an existing department
        const index = this.departments.findIndex(dep => dep.id === this.editingDepartment.id);
        if (index !== -1) {
          this.departments.splice(index, 1, { ...this.editingDepartment });
        }
      }

      // Save the updated departments array to localStorage
      this.saveDepartmentsToLocalStorage([...this.departments]);

      // Clear the input fields
      this.editingDepartment.id = null;
      this.editingDepartment.name = '';
      this.editingDepartment.description = '';
      this.editingDepartment.company = null;

      // Close the modal
      this.modalOpen = false;
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
};
</script>

<style>
/* Add your styling as needed */
</style>
