<!-- views/HomePage.vue -->
<template>
  <div class="main-text">
    <h1>Welcome to the Home-Page</h1>
    <!-- Add your home page content here -->
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.main-text {
  padding-top: $spacing-unit * 3; // Use spacing unit variable for consistency
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: $text-color;
  background-color: $primary-color; // Make the full background primary color
  height: 100vh; // Set the height to take up the full viewport
}
</style>