<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Company Registration</v-card-title>
      <v-card-text>
        <company-registration-form @company-registered="closeModal" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CompanyRegistrationForm from "./companyRegistrationForm.vue";

export default {
  components: {
    CompanyRegistrationForm,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openModal() {
      this.dialog = true;
    },
    closeModal(company) {
      this.dialog = false;
      // Optionally handle the registered company data
      console.log('Company registered:', company);
    },
  },
};
</script>
