<!-- component/Login.vue-->
<template>
  <div class="login-container">
    <div class="login-box">
      <button class="close-button" @click="$emit('close')">X</button>

      <!-- Login Form -->
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="userName">User Name</label>
          <input type="text" id="userName" v-model="userName" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { useUserAuthStore } from '@/services/api/userAuth'; // Adjust path if necessary
import { ref } from 'vue';

export default {
  props: ['close'], // Declare the close prop
  setup(props) {
    const userName = ref('');
    const password = ref('');
    const errorMessage = ref(null);
    const userAuthStore = useUserAuthStore();

    // Handle Login
    const handleLogin = async () => {
      try {
        await userAuthStore.login(userName.value, password.value); // Use userName and password for login
        errorMessage.value = null;
        props.close(); // Close modal after successful login
      } catch (error) {
        console.error("Login failed", error);
        errorMessage.value = error.response?.data?.detail || 'Invalid login credentials';
      }
    };

    return {
      userName,
      password,
      handleLogin,
      errorMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.login-container {
  background-color: $background-color;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: $primary-color;
  padding: $spacing-unit * 2;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  position: relative; /* To position the close button absolutely */

  h2 {
    color: $button-color;
    text-align: center;
    margin-bottom: $spacing-unit * 1.5;
  }

  form {
    display: flex;
    flex-direction: column;

    .input-group {
      margin-bottom: $spacing-unit;

      label {
        color: $text-color;
        font-weight: bold;
        margin-bottom: 4px;
      }

      input {
        padding: $spacing-unit;
        border: 1px solid $border-color;
        border-radius: 4px;
        width: 100%;
        font-size: 1rem;
      }
    }

    button {
      background-color: $accent-color;
      color: $button-color;
      border: none;
      padding: $spacing-unit;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: $hover-color;
      }
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: $button-color;

    &:hover {
      color: $highlight-color;
    }
  }

  .error-message {
    color: $error-color;
    text-align: center;
    margin-top: $spacing-unit;
  }
}
</style>
