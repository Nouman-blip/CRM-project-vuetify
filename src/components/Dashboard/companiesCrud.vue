<template>
  <v-container>
    <sideBarCompany />
    <v-data-table :items="companies" :headers="headers" @row-click="editCompany">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.user }}</td>
          <td>
            <!-- Conditionally render the logo if a valid URL is provided -->
            <v-img v-if="isValidUrl(item.logo)" :src="item.logo" aspect-ratio="2"></v-img>
          </td>
          <td>
            <v-menu offset-y>
               <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                     <v-icon>mdi-dots-vertical</v-icon>
                     </v-btn>
               </template>
              <v-list>
                <v-list-item @click="editCompany(item)">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteCompany(item)">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$router.push('/companies/departments')">
                  <v-list-item-title>Add Department</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-btn @click="openModal" color="primary">Add New Company</v-btn>

    <!-- Company Registration Modal -->
    <v-dialog v-model="modalOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline mb-2" v-if="editingCompany">
          Edit Company - {{ editingCompany.name }}
        </v-card-title>
        <v-card-title class="headline mb-2" v-else>
          Company Registration
        </v-card-title>
        <v-card-text>
          <company-registration-form :initialCompany="editingCompany" @company-registered="saveCompany" />
        </v-card-text>
      </v-card>
    </v-dialog>

    

    <!-- Company Modal -->
    <company-modal :company="editingCompany" :modal-open="companyModalOpen" @close-modal="closeCompanyModal" />
  </v-container>
</template>

<script>
import CompanyRegistrationForm from "../views/companyRegistrationForm.vue";
import sideBarCompany from './sideBarComapny.vue';
import CompanyModal from '../views/companyModal.vue';
export default {
  components: {
    CompanyRegistrationForm,
    sideBarCompany,
    CompanyModal,
  },
  data() {
    return {
      companies: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        {text:"User",value:"user"},
        { text: "Logo", value: "logo" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      modalOpen: false,
      addEmployeeModal: false,
      companyModalOpen: false,
      editingCompany: null,
      newEmployeeName: "",
      newEmployeeEmail: "",
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
      this.editingCompany = null;
    },
    closeModal() {
      this.modalOpen = false;
      this.fetchCompanies();
    },
    fetchCompanies() {
      this.companies = this.getCompaniesFromLocalStorage();
    },
    editCompany(selectedCompany) {
      this.editingCompany = selectedCompany;
      this.modalOpen = true;
    },
    saveCompany(company) {
      let updatedCompanies = this.getCompaniesFromLocalStorage();
      if (this.editingCompany) {
        const index = updatedCompanies.findIndex((c) => c.id === this.editingCompany.id);
        if (index !== -1) {
          updatedCompanies.splice(index, 1, company);
        }
      } else {
        company.id = Date.now();
        company.users = []; // Initialize users array for the new company
        updatedCompanies.push(company);
      }
      localStorage.setItem("companies", JSON.stringify(updatedCompanies));
      this.closeModal();
    },
    deleteCompany(company) {
      const updatedCompanies = this.getCompaniesFromLocalStorage().filter((c) => c.id !== company.id);
      localStorage.setItem("companies", JSON.stringify(updatedCompanies));
      this.fetchCompanies();
    },
    // 
    
    openCompanyModal(company) {
      this.editingCompany = company;
      this.companyModalOpen = true;
    },
    closeCompanyModal() {
      this.companyModalOpen = false;
    },
    getCompaniesFromLocalStorage() {
      return JSON.parse(localStorage.getItem("companies")) || [];
    },
    isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  mounted() {
    this.fetchCompanies();
  },
};
</script>

<style>
/* Vuetify styles for headers */
.v-data-table-header th {
  background-color: #f7f7f7; /* Light gray background color */
  color: #333333; /* Dark gray text color */
  border: 1px solid #e0e0e0; /* Light gray border */
}

/* Vuetify styles for row hover */
.v-data-table tbody tr:hover {
  background-color: #f2f2f2; /* Light gray background on hover */
}

/* Vuetify styles for kebab menu icon */
.v-btn-icon {
  color: #333333; /* Dark gray color for the kebab menu icon */
}
</style>
