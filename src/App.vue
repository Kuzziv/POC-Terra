<!-- App.vue -->
<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script>

import AppNavbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar
  },
  data() {
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';
@import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Karla", sans-serif;
}

body {
  background-image: url('@/assets/CamardisLogoUsable.png'); /* Adjust the path as needed */
  background-size: cover; /* Cover the entire element */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Do not repeat the background image */
  margin: 0; /* Remove default body margin */
  padding: 0; /* Remove default body padding */
  height: 100vh; /* Set the body height to 100% of the viewport height */
}
</style>