// services/api/userAuth.js
import { defineStore } from 'pinia';
import axiosClient from './axiosClient';

export const useUserAuthStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,  // Load user from localStorage
    accessToken: localStorage.getItem('accessToken') || null,  // Load access token from localStorage
    refreshToken: localStorage.getItem('refreshToken') || null,  // Load refresh token (optional)
  }),
  
  actions: {
    async login(username, password) {
      try {
        const response = await axiosClient.post('/login/', { username, password });

        const { access, refresh } = response.data;
        
        // Store user and tokens in state and localStorage
        this.accessToken = access;
        this.refreshToken = refresh;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);  // If using refresh tokens
        
        // Optionally fetch and store user information from the API
        await this.refreshUserInfo();
        
        console.log('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Invalid login credentials');
      }
    },

    async refreshUserInfo() {
      try {
        const response = await axiosClient.get('/users/');
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log('User info refreshed:', this.user);
      } catch (error) {
        console.error('Failed to refresh user info:', error);
      }
    },

    // Handle logout by clearing the state and localStorage
    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

    // Check if user is authenticated based on the presence of an access token
    isAuthenticated() {
      return !!this.accessToken;
    },
  },
});
