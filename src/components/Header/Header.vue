<script setup lang="ts">
import Logo from '../Logo/Logo.vue'
</script>
<template>
  <header class="header">
    <Logo />
  </header>
</template>
<style scoped>
.header {
  width: 100%;
  display: flex;
  height: 2rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  background-color: #f55d05;
}
</style>