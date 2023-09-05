<template>
  <div class="places">
    <div class="places__header">
      <el-button color="#3d6a79" class="places__generate" @click="generate()"
        >Generate Places</el-button
      >
    </div>
    <div class="places__cards">
      <div v-for="dice in dicePool" :key="dice.toString()">
        <PlaceCard :d66="dice" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Die66 } from '@/composables/dice';
import { ElButton } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';
import PlaceCard from '../components/PlaceCard.vue';

const dicePool: Ref<Die66[]> = ref([]);

const generate = () => {
  dicePool.value = [];
  let counter = 0;
  while (dicePool.value.length < 2 && counter < 999) {
    counter++;
    const dice = new Die66();
    if (!dicePool.value.some((pair) => pair.toString() === dice.toString()))
      dicePool.value.push(dice);
  }
};

onMounted(() => generate());
</script>

<style scoped lang="scss">
.places {
  display: grid;
  gap: 1rem;

  &__cards {
    display: grid;
    gap: 1rem;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__header {
    grid-column: 1/-1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
