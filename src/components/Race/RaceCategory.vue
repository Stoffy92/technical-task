<script setup lang="ts">
import { useRacingStore } from '../../stores/racingStore/racingStore';
import { categoryList } from './utils';

const store = useRacingStore();

function toggleCategory(categoryId: string) {
  const updatedCategories = store.selectedCategories.includes(categoryId)
    ? store.selectedCategories.filter((id) => id !== categoryId) 
    : [...store.selectedCategories, categoryId]; 

  store.setSelectedCategories(updatedCategories); 
}


</script>



<template>
  <div class="row">
    <div>
      <h3>Next to go</h3>
    </div>
    <div class="input-container">
      <div v-for="category in categoryList" :key="category.categoryId">
        <label class="label-container">
          <input
            type="checkbox"
            :value="category.categoryId"
            :checked="store.selectedCategories.includes(category.categoryId)"
            @change="toggleCategory(category.categoryId)"
          />
          <img :src="category.icon" alt="Category Icon" class="category-icon" />
          {{ category.label }}
        </label>
      </div>
    </div>
  </div>
</template>
<style scoped>

.category-icon {
  display: flex;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #3c4a57;
  color: white;
  padding: 2rem;
  height: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.label-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
  color: white;
  font-size: 1rem;
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 45rem;
  justify-content: space-between;
}

input[type="checkbox"] {
  appearance: none; /* Remove default checkbox styling */
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid#f55d05;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #f55d05;
  border-color: #f55d05;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>