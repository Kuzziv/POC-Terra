<!-- components/LoginForm.vue -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="userName">User Name</label>
        <input type="text" id="userName" v-model="localUserName" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="localPassword" required />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineProps, defineEmits, ref, watch } from 'vue';

export default {
  props: {
    userName: String,
    password: String,
    errorMessage: String,
    handleLogin: Function,
  },
  setup(props, { emit }) {
    // Create internal references for username and password
    const localUserName = ref(props.userName);
    const localPassword = ref(props.password);

    // Watch for changes in the local references and emit them to the parent
    watch(localUserName, (newValue) => {
      emit('update:userName', newValue);
    });

    watch(localPassword, (newValue) => {
      emit('update:password', newValue);
    });

    return {
      localUserName,
      localPassword,
    };
  },
};
</script>

<style lang="scss" scoped>
/* Add your styles here */
.input-group {
  margin-bottom: 1rem;
}
.error-message {
  color: red;
}
.submit-button {
  background-color: crimson;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
