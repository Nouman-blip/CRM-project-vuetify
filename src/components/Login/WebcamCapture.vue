<template>
    <div>
      <v-btn v-if="!isCameraOpen" @click="toggleCamera">Capture Photo</v-btn>
      <v-btn v-else @click="capturePhoto">Capture Photo</v-btn>
      <video ref="video" v-show="isCameraOpen" width="320" height="240" autoplay muted @loadedmetadata="videoReady"></video>
      <canvas ref="canvas" style="display:none;"></canvas>
      <!-- Image preview section -->
      <div v-if="imageDataURL">
        <img :src="imageDataURL" alt="Captured Image Preview" width="320" height="240">
        <v-btn v-if="!submitClicked" @click="submitPhoto">Submit</v-btn>
      </div>
      <!-- Close camera button -->
      <v-btn v-if="isCameraOpen" @click="toggleCamera">Close Camera</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: "WebcamCapture",
    data() {
      return {
        video: false,
        stream: false,
        isVideoReady: false,
        imageDataURL: null, // Store the captured image data URL for preview
        isCameraOpen: true, // Initially set to true to show the camera view
        submitClicked: false // Flag to track if submit button is clicked
      };
    },
    mounted() {
      this.startVideo();
    },
    methods: {
      async startVideo() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this.video = this.$refs.video;
          this.video.srcObject = stream;
          this.video.play(); // Ensure the video starts playing
          this.isVideoReady = true; // Set video ready flag to true
          this.stream = stream; // Save the stream object
        } catch (error) {
          console.error('Error starting video stream:', error);
          alert('Failed to access the webcam. Please allow camera access and try again.');
        }
      },
      videoReady() {
        this.isVideoReady = true;
      },
      toggleCamera() {
        if (this.isCameraOpen) {
          // If closing the camera, stop the stream
          if (this.stream) {
            const tracks = this.stream.getTracks();
            tracks.forEach(track => track.stop()); // Stop all tracks
            this.stream = null; // Clear the stream object
            this.isVideoReady = false; // Set video ready flag to false
          }
        } else {
          // If opening the camera, start the video stream
          this.startVideo();
        }
        this.isCameraOpen = !this.isCameraOpen;
      },
      capturePhoto() {
        if (!this.isVideoReady) {
          alert('The video stream is not ready yet.');
          return;
        }
        this.video = this.$refs.video;
        const canvas = this.$refs.canvas;
        canvas.width = this.video.videoWidth; // Set canvas width and height based on video dimensions
        canvas.height = this.video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        this.imageDataURL = canvas.toDataURL('image/png'); // Save the captured image for preview
      },
      submitPhoto() {
  // Emit an event with the captured image data URL for submission
  this.submitClicked = true;
  this.$emit('photo-submitted', this.imageDataURL);
  this.imageDataURL = null; // Reset the image preview
  this.stopCamera(); // Stop the camera stream
},

stopCamera() {
  if (this.stream) {
    const tracks = this.stream.getTracks();
    tracks.forEach(track => track.stop()); // Stop all tracks
    this.stream = null; // Clear the stream object
    this.isVideoReady = false; // Set video ready flag to false
    this.isCameraOpen = false; // Close the camera view
  }
}

    }
  };
  </script>
  