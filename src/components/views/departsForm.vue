<!-- src/components/Views/companyRegistrationForm.vue -->
<template>
    <v-form ref="form" v-model="valid">
        <v-text-field v-model="Department.name" label="Department Name"></v-text-field>
        <v-textarea v-model="Department.description" label="Department Description"></v-textarea>
        <v-select
            v-model="Department.company"
            :items="companyOptions"
            label="Select Company"
            item-text="name"
            item-value="id"
        ></v-select>
  
     
  
      <v-btn :disabled="!valid" @click="registerOrUpdateDepartment" color="primary">
        {{ initialDepartment ? 'Update Department' : 'Register Department' }}
      </v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      initialDepartment: Object, // Prop to receive initial department data for editing
    },
    data() {
      return {
        valid: false,
        Department: {
           id: null,
           name: '',
           description: '',
           company: null,
      },
      companyOptions: JSON.parse(localStorage.getItem("companies"))
      };
    },
    methods: {
      registerOrUpdateDepartment() {
        if (this.$refs.form.validate()) {
          // Emit an event to notify the parent component (departmentComponent.vue)
          this.$emit('department-registered', {
            ...this.Department,
            id: this.initialDepartment ? this.initialDepartment.id : null,
          });
          this.resetForm();
        }
      },
      resetForm() {
        // Reset form fields after registration or update
        this.Department={
           id: null,
           name: '',
           description: '',
           company: null,
        };
      },
    },
    watch: {
      initialDepartment: {
        // Watch for changes in the initialDepartment prop
        immediate: true,
        handler(newVal) {
          // Update the form data when the initialDepartment changes (for editing)
          if (newVal) {
            this.Department = { ...newVal };
          }
        },
      },
    },
  };
  </script>
  