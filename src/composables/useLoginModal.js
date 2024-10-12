// composables/useLoginModal.js
import { ref } from 'vue';
import { useUserAuthStore } from '@/services/api/userAuth';

export default function useLoginModal() {
  const showLogin = ref(false);
  const userName = ref('');
  const password = ref('');
  const errorMessage = ref(null);
  const userAuthStore = useUserAuthStore();

  const openModal = () => {
    showLogin.value = true;
  };

  const closeModal = () => {
    showLogin.value = false;
  };

  const handleLogin = async () => {
    try {
      await userAuthStore.login(userName.value, password.value);
      errorMessage.value = null;
      closeModal(); // Close modal after successful login
    } catch (error) {
      console.error("Login failed", error);
      errorMessage.value = error.response?.data?.detail || 'Invalid login credentials';
    }
  };

  return {
    showLogin,
    userName,
    password,
    errorMessage,
    openModal,
    closeModal,
    handleLogin,
  };
}
