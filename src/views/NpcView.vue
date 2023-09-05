<template>
  <div class="npc">
    <div class="npc__header">
      <el-button color="#3d6a79" @click="generate()">Generate NPC</el-button>
    </div>

    <h1>
      <a :href="speciesUrl" target="_blank">{{ species }}</a>
    </h1>

    <div class="npc__traits">
      <div class="npc__traits--cards">
        <div v-for="dice in traitDice" :key="dice.toString()">
          <TraitCard :d66="dice" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Die66, dieN } from '@/composables/dice';
import { ElButton } from 'element-plus';
import { computed, onMounted, ref, type Ref } from 'vue';
import TraitCard from '../components/TraitCard.vue';

const NPC_SPECIES: Array<string[]> = [
  ['Human Male', 'star_wars_male'],
  ['Human Female', 'star_wars_female'],
  ['Bothan', 'bothan'],
  ['Chiss', 'chiss'],
  ['Duros', 'duros'],
  ['Gamorrean', 'gamorrean'],
  ['Hutt', 'hutt'],
  ['Ithorian', 'ithorian'],
  ['Mon Calamari', 'mon_calamari'],
  ['Quarren', 'quarren'],
  ['Rodian', 'rodian'],
  ['Sullustan', 'sullustan'],
  ['Trandoshan', 'trandoshan'],
  ["Twi'lek", 'twilek'],
  ['Wookiee', 'wookiee'],
  ['Droid', 'droid']
];

const species = computed(() => NPC_SPECIES[speciesDie.value][0]);
const speciesUrl = computed(
  () => `https://donjon.bin.sh/scifi/name/star_wars.html#type=${NPC_SPECIES[speciesDie.value][1]}`
);
const speciesDie = ref(0);
const traitDice: Ref<Die66[]> = ref([]);

const generate = () => {
  speciesDie.value = dieN(Object.keys(NPC_SPECIES).length);
  species.value = traitDice.value = [];
  let counter = 0;
  while (traitDice.value.length < 2 && counter < 999) {
    counter++;
    const dice = new Die66();
    if (!traitDice.value.some((pair) => pair.toString() === dice.toString()))
      traitDice.value.push(dice);
  }
};

onMounted(() => generate());
</script>

<style lang="scss">
.npc {
  display: grid;
  gap: 1rem;

  &__traits {
    display: grid;
    gap: 1rem;

    &--cards {
      display: grid;
      gap: 1rem;

      @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }
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
