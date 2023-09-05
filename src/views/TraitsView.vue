<template>
  <div class="traits">
    <div class="traits__header">
      <el-button color="#3d6a79" @click="generate()">Generate Traits</el-button>
    </div>
    <div class="traits__cards">
      <div v-for="dice in dicePool" :key="dice.toString()">
        <TraitCard :d66="dice" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Die66 } from '@/composables/dice';
import { ElButton } from 'element-plus';
import { onMounted, ref, type Ref } from 'vue';
import TraitCard from '../components/TraitCard.vue';

const props = defineProps({
  cards: {
    type: Number,
    default: 2
  }
});

const dicePool: Ref<Die66[]> = ref([]);

const generate = () => {
  dicePool.value = [];
  let counter = 0;
  while (dicePool.value.length < props.cards && counter < 999) {
    counter++;
    const dice = new Die66();
    if (!dicePool.value.some((pair) => pair.toString() === dice.toString()))
      dicePool.value.push(dice);
  }
};

onMounted(() => generate());
</script>

<style lang="scss">
.traits {
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
