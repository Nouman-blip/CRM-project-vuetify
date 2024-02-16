<!-- src/components/Views/companyRegistrationForm.vue -->
<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="company.name" label="Company Name" required></v-text-field>
    <v-text-field v-model="company.email" label="Email" type="email" required></v-text-field>
    <v-text-field v-model="company.user" label="User" type="text" required></v-text-field>
    <v-text-field v-model="company.logo" label="Logo URL" required></v-text-field>

   

    <v-btn :disabled="!valid" @click="registerOrUpdateCompany" color="primary">
      {{ initialCompany ? 'Update Company' : 'Register Company' }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    initialCompany: Object, // Prop to receive initial company data for editing
  },
  data() {
    return {
      valid: false,
      company: {
        name: '',
        user:'',
        email: '',
        logo: '',
      },
    };
  },
  methods: {
    registerOrUpdateCompany() {
      if (this.$refs.form.validate()) {
        // Emit an event to notify the parent component (companies.vue)
        this.$emit('company-registered', {
          ...this.company,
          id: this.initialCompany ? this.initialCompany.id : null,
        });
        this.resetForm();
      }
    },
    resetForm() {
      // Reset form fields after registration or update
      this.company = {
        name: '',
        email: '',
        user:'',
        logo: '',
      };
    },
  },
  watch: {
    initialCompany: {
      // Watch for changes in the initialCompany prop
      immediate: true,
      handler(newVal) {
        // Update the form data when the initialCompany changes (for editing)
        if (newVal) {
          this.company = { ...newVal };
        }
      },
    },
  },
};
</script>
