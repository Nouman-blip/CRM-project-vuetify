<template>
    <v-app>
      <v-main>
        <v-container fill-height fluid>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12" outlined>
                <v-card-title class="justify-center">Login</v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" @submit.prevent="validateForm">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
                    <v-btn :disabled="!valid" :color="isPhotoSubmitted ? 'success' : 'primary'" class="mr-4" @click="validateForm" >{{ isPhotoSubmitted ? 'Login' : 'Submit' }}</v-btn>
                    <v-btn v-if="showCaptureButton" color="primary" @click="dialog = true">Capture Photo</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
              <div v-if="submittedPhoto">
                <v-img :src="submittedPhoto" contain alt="Submitted Photo" max-width="320"></v-img>
              </div>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" persistent max-width="300px">
            <WebcamCapture @photo-submitted="handlePhotoSubmission"/>
          </v-dialog>
        </v-container>
      </v-main>
      
    </v-app>
  </template>
  
  <script>
  
  import WebcamCapture from './WebcamCapture.vue';

  
  export default {
    name: 'loginForm',
    components:{
        WebcamCapture,
    },
    
    data() {
      return {
        email: '',
        password: '',
        valid: false,
        dialog: false,
        showCaptureButton: false,
        submittedPhoto: null, // Store the URL of the submitted photo
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 8 || 'Password must be at least 8 characters',
        ],
      };
    },
    computed: {
      isPhotoSubmitted() {
        return !!this.submittedPhoto;
      }
    },
    methods: {
      validateForm() {
        if (this.$refs.form.validate()) {
          this.showCaptureButton = true;
        }
        if(this.isPhotoSubmitted){

            // Convert image data to URL
           const imageDataURL = this.submittedPhoto;

// Store data in local storage
           const userData = {
              email: this.email,
              password: this.password,
              photoURL: imageDataURL,
           };
           localStorage.setItem('userData', JSON.stringify(userData))
           alert("successfully submitted!");
        }

      },
      handlePhotoSubmission(imageDataURL) {
        this.submittedPhoto = imageDataURL; // Store the photo URL for display
        this.dialog = false; 
      },
      
    },
  };
  </script>
  
  