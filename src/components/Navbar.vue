<!-- Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="container">
      <ul class="navbar-list">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
      </ul>
      <div class="navbar-actions">
        <template v-if="userAuthStore && userAuthStore.isAuthenticated()">
          <span class="user-info">{{ userAuthStore.user?.name || 'User' }}</span>
          <button class="logout-button" @click="logout">Logout</button>
        </template>
        <template v-else>
          <button class="login-button" @click="openModal">Login</button>
        </template>
      </div>
    </div>

    <!-- Reusable Modal Component for Login -->
    <ModalComponent :modalActive="showLogin" @close="closeModal">
      <div>
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
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <div class="button-group">
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" class="close-button" @click="closeModal">Close</button>
          </div>
        </form>
      </div>
    </ModalComponent>
  </nav>
</template>

<script>
import ModalComponent from './ModalComponent.vue';
import useLoginModal from '@/composables/useLoginModal';
import { useUserAuthStore } from '@/services/api/userAuth';

export default {
  components: {
    ModalComponent,
  },
  setup() {
    const {
      showLogin,
      userName,
      password,
      errorMessage,
      openModal,
      closeModal,
      handleLogin,
    } = useLoginModal();

    const userAuthStore = useUserAuthStore();

    const logout = () => {
      userAuthStore.logout();
    };

    return {
      userAuthStore,
      showLogin,
      userName,
      password,
      errorMessage,
      openModal,
      closeModal,
      handleLogin,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

/* Navbar styling */
.navbar {
  background-color: $secondary-color;
  color: $text-color;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
  }

  .navbar-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;

    li {
      margin: 0 15px;
    }
  }

  .navbar-actions {
    margin-left: auto; /* Pushes the login button to the right */
    display: flex;
    align-items: center;

    .login-button {
      background-color: $primary-color;
      color: $button-color;
      border: none;
      padding: $spacing-unit;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: $hover-color;
      }
    }
  }
}

/* Alignment for labels and input fields to be in a grid-like layout */
.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.3rem;
    font-weight: bold;
    color: #333;
  }

  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
  }
}

/* Styling the button group to center the buttons */
.button-group {
  display: flex;
  justify-content: center; /* Align buttons to the center */
  gap: 15px; /* Add space between buttons */
  margin-top: 1.5rem;

  button {
    padding: 10px 20px;
    border: none;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
  }

  .submit-button {
    background-color: #007bff; /* Blue to indicate submission */
    color: #fff;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .close-button {
    background-color: crimson; /* Red to make it stand out as 'Cancel' */
    color: #fff;

    &:hover {
      transform: translateY(-2px);
    }
  }

  /* For button press visual feedback */
  button:active {
    transform: translateY(0);
  }
}

/* Styling the error message */
.error-message {
  color: crimson;
  font-weight: bold;
  margin-top: 10px;
}
</style>
