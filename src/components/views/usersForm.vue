<template>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="Users.name" label="User Name"></v-text-field>
      <v-select
        v-model="Users.company"
        :items="companyOptions"
        label="Select Company"
        item-text="name"
        item-value="id"
        required
      ></v-select>
      <v-select
        v-model="Users.department"
        :items="departmentOptions"
        label="Select Department"
        item-text="name"
        item-value="id"
      ></v-select>
  
      <v-btn :disabled="!valid" @click="registerOrUpdateUser" color="primary">
        {{ initialUser ? 'Update User' : 'Register User' }}
      </v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      initialUser: Object, // Prop to receive initial user data for editing
    },
    data() {
      return {
        valid: false,
        Users: {
          id: null,
          name: '',
          company: null,
          department: null,
        },
        companyOptions: JSON.parse(localStorage.getItem("companies")) || [],
        departmentOptions: JSON.parse(localStorage.getItem("departments")) || [],
      };
    },
    methods: {
      registerOrUpdateUser() {
        if (this.$refs.form.validate()) {
          // Emit an event to notify the parent component (userComponent.vue)
          this.$emit('user-registered', {
            ...this.Users,
            id: this.initialUser ? this.initialUser.id : null,
          });
          this.resetForm();
        }
      },
      resetForm() {
        // Reset form fields after registration or update
        this.Users = {
          id: null,
          name: '',
          company: null,
          department: null,
          companyId:JSON.parse(localStorage.getItem('selected_company')).id,
        };
      },
    },
    watch: {
      initialUser: {
        // Watch for changes in the initialUser prop
        immediate: true,
        handler(newVal) {
          // Update the form data when the initialUser changes (for editing)
          if (newVal) {
            this.Users = { ...newVal };
          }
        },
      },
    },
  };
  </script>
  