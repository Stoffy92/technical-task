<script setup lang="ts">
import Header from './components/Header/Header.vue';
import Container from './components/Container/Container.vue';
import { useRacingStore } from './stores/racingStore/racingStore';
import { onMounted } from 'vue';
const store = useRacingStore();

onMounted(() => {
  console.log('App mounted, fetching next');
  store.fetchNextToGoRaces();
});

</script>

<template>
  <Header />
  <Container />
</template>

