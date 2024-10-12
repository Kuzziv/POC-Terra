<!-- component/Navbar.vue-->
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
          <button class="login-button" @click="showLogin = true">Login</button>
        </template>
      </div>
    </div>

    <div v-if="showLogin" class="modal-overlay" @click.self="closeLogin">
      <div class="modal-content">
        <Login @close="closeLogin" />
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserAuthStore } from '@/services/api/userAuth';
import Login from './Login.vue';
import { ref } from 'vue';

export default {
  components: {
    Login,
  },
  setup() {
    const showLogin = ref(false);
    const userAuthStore = useUserAuthStore();

    const closeLogin = () => {
      showLogin.value = false;
    };

    const logout = () => {
      userAuthStore.logout();
    };

    return {
      showLogin,
      closeLogin,
      logout,
      userAuthStore,  // Make sure to return userAuthStore from setup
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
  
  .nav-link {
    color: $button-color;
    text-decoration: none;
    padding: 10px 20px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 4px;
  
    &:hover {
      background-color: $secondary-color;
      color: $primary-color;
    }
  }
  
  /* Styles for the login button */
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
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: $background-color;
    padding: $spacing-unit;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  </style>
  