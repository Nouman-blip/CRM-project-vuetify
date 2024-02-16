<!-- src/components/Views/viewCompanies.vue -->
<template>
  <v-container>
    <h1>View Companies</h1>

    <!-- Add New Company Button -->
    <v-btn @click="openModal" color="primary">Add New Company</v-btn>

    <!-- Data table to display companies -->
    <v-data-table :items="companies" :headers="headers"></v-data-table>

    <!-- Company Registration Modal -->
    <v-dialog v-model="modalOpen" max-width="500px">
      <v-card>
        <v-card-title>Company Registration</v-card-title>
        <v-card-text>
          <company-registration-form @company-registered="closeModal" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CompanyRegistrationForm from "./companyRegistrationForm.vue";

export default {
  data() {
    return {
      companies: this.getCompaniesFromLocalStorage(),
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        
      ],
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
      this.fetchCompanies(); // Reload companies after registration
    },
    fetchCompanies() {
      this.companies = this.getCompaniesFromLocalStorage(); // Update companies array with fetched data
    },
    getCompaniesFromLocalStorage() {
      // Retrieve companies from local storage, or an empty array if not present
      return JSON.parse(localStorage.getItem("companies")) || [];
    },
    saveCompaniesToLocalStorage(companies) {
      // Save companies to local storage
      localStorage.setItem("companies", JSON.stringify(companies));
    },
  },
  components: {
    CompanyRegistrationForm,
  },
  mounted() {
    this.fetchCompanies(); // Fetch companies when the component is mounted
  },
};
</script>
