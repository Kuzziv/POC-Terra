<template>
    <transition name="modal-animation">
      <div v-show="modalActive" class="modal">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="modal-inner">
            <i @click="close" class="far fa-times-circle close-icon"></i>
            <!-- Modal Content -->
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: ["modalActive"],
    setup(props, { emit }) {
      const close = () => {
        emit("close");
      };
  
      return { close };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }
  
  .modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  
  .modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .modal-animation-inner-leave-to {
    transform: scale(0.95);
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-inner {
    position: relative;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
  
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      font-weight: bold;
      color: #333;
    }
  
    .input-group {
      margin-bottom: 1.5rem;
      text-align: left;
  
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #444;
      }
  
      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
      }
    }
  
    .error-message {
      color: crimson;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
  
    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
  
      button {
        padding: 12px 20px;
        border: none;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease;
  
        &:first-child {
          background-color: #d9534f;
          color: #fff;
        }
  
        &:last-child {
          background-color: crimson;
          color: #fff;
        }
  
        &:hover {
          transform: translateY(-2px);
        }
  
        &:active {
          transform: translateY(0);
        }
      }
    }
  
    .close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 1.5rem;
      cursor: pointer;
      color: #444;
  
      &:hover {
        color: crimson;
      }
    }
  }
  </style>
  