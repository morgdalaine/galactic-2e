<template>
  <div class="trait">
    <h3 class="trait__category">{{ category }}</h3>
    <h1 class="trait__name">{{ trait }}</h1>
    <span class="trait__choose">Choose 1–2:</span>
    <ul>
      <li v-for="move in moves" :key="move">{{ move }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Die66 } from '@/composables/dice';

const TRAIT_DATA = {
  social: ['friendly', 'connected', 'conciliatory', 'compassionate', 'gossipy', 'troublemaker'],
  intellectual: ['wise', 'curious', 'cunning', 'inventive', 'learned', 'analytical'],
  watchful: ['protective', 'focused', 'anxious', 'observant', 'stealthy', 'scheming'],
  authoritative: ['austere', 'daring', 'commanding', 'dramatic', 'cocky', 'rousing'],
  ideological: ['faithful', 'passionate', 'cynical', 'mercenary', 'maverick', 'zealous'],
  personal: ['attuned', 'burdened', 'innocent', 'ancient', 'awkward', 'ethereal']
};

const TRAIT_MOVES = {
  friendly: [
    'tell a good joke or story, and gain a token.',
    'go out of your way to talk to someone, and give them a token.',
    'ask “is there anything i can do to help?” and give them a token if they say yes.'
  ],
  connected: [
    'take note of who is here, and gain a token.',
    'introduce two people with something in common, and give them each a token.',
    'point someone towards who or what they’re looking for, and give them a token.'
  ],
  conciliatory: [
    'argue for a more peaceful or moderate solution, and gain a token.',
    'stop someone from starting a fight, and give them a token.',
    'ask “is there any other way to do this?” and give them a token if they give an answer that isn’t a straight no.'
  ],
  compassionate: [
    'talk about your feelings, and gain a token.',
    'give someone reassurance they need, and give them a token.',
    'ask “do you want to talk about it?” and give them a token if they say yes.'
  ],
  gossipy: [
    'listen in, and gain a token.',
    'give someone a juicy piece of information, and give them a token.',
    'start a rumor about someone, and give them a token.'
  ],
  troublemaker: [
    'pull a prank, and gain a token.',
    'start a fight or argument, and give those involved a token.',
    'encourage someone to cause trouble with you, and give them a token if they do.'
  ],
  wise: [
    'give genuine consideration to something unexpected, and gain a token.',
    'point out a contradiction in someone’s logic or plan, and give them a token.',
    'ask someone a question they don’t yet know the answer to, and give them a token.'
  ],
  curious: [
    'focus on an irrelevant detail, and gain a token.',
    'listen patiently and reverently, and gain a token.',
    'ask someone a barrage of questions, and give them a token.'
  ],
  cunning: [
    'reveal that you’ve been one step ahead this whole time, and gain a token.',
    'lie to someone, and give them a token if they believe it.',
    'ask “what’s your real goal here?” and give them a token.'
  ],
  inventive: [
    'tinker with an object or idea, and gain a token.',
    'create something new, and gain a token.',
    'fix something broken, and give the one who needed it a token.'
  ],
  learned: [
    'reference a text or tradition no one else here has heard of, and gain a token.',
    'know something useful and relevant, and give the person you help a token.',
    'ask “do you want my advice?” and give them a token if they say yes.'
  ],
  analytical: [
    'calculate things in the background, and gain a token.',
    'reveal a tiny window of opportunity to someone, and give them a token.',
    'say “the odds are against you” to someone, and give them a token.'
  ],
  protective: [
    'say “i’m coming with you” and gain a token.',
    'get hurt to protect someone else, and give them a token.',
    'demand that someone stay out of danger, and give them a token.'
  ],
  focused: [
    'spend a great deal of energy or time attempting perfection, and gain a token.',
    'remind everyone to stay on task, and gain a token.',
    'ask “how are you going to help?” and give them a token if they answer.'
  ],
  anxious: [
    'ramble about the things that could possibly go wrong, and gain a token.',
    'ask someone for reassurance, and give them a token if they give it to you.',
    'give into pressure from someone who wants something from you, and give them a token.'
  ],
  observant: [
    'keep your eyes peeled, and gain a token.',
    'point out something someone else missed, and give them a token.',
    'ask “what are you hiding that i noticed?” and give them a token.'
  ],
  stealthy: [
    'vanish into a crowd or shadows, and gain a token.',
    'hide someone or something from sight, and give them a token.',
    'move easily past an obstacle that should’ve given you trouble, and beckon for others to follow. give them a token if they do.'
  ],
  scheming: [
    'monologue about your plans, and gain a token.',
    'reveal you have leverage over someone, and give them a token.',
    'ask “what can you do for me?” and give them a token if you take them up on their answer.'
  ],
  austere: [
    'hold your head up high, and gain a token.',
    'give someone harsh criticism, and give them a token.',
    'demand someone change what they’re doing to fit your values, and give them a token.'
  ],
  daring: [
    'propose an exciting and over-complicated idea, and gain a token.',
    'invite someone to do something dangerous; give them a token if they say yes.',
    'get in over your head and ask for backup or rescue; give those who answer a token.'
  ],
  commanding: [
    'tower over others, literally or metaphorically, and gain a token.',
    'give someone a direct order or threat, and give them a token.',
    'block someone’s path forward, and give them a token.'
  ],
  dramatic: [
    'be the center of attention, and gain a token.',
    'react in an over-the-top manner, and gain a token.',
    'act as a distraction for someone else, and give them a token.'
  ],
  cocky: [
    'project overconfidence, and gain a token.',
    'insert yourself into someone’s conversation or plan, and give them a token.',
    'make a wrong-headed assumption about someone, and give them a token when you act on it.'
  ],
  rousing: [
    'look confidently into the distance, and gain a token.',
    'tell someone exactly what they need to hear, and give them a token.',
    'lead by example, and give those who follow a token.'
  ],
  faithful: [
    'spend a moment to reflect or pray, and gain a token.',
    'ask someone “what do you believe?” and give them a token.',
    'give someone reason to carry on when they feel dejected or hopeless, and give them a token.'
  ],
  passionate: [
    'explain why something matters to you, and gain a token.',
    'react with unexpectedly intense emotion, and gain a token.',
    'question someone’s beliefs or actions, and give them a token.'
  ],
  cynical: [
    'roll your eyes, and gain a token.',
    'protect someone in a way that goes against their beliefs, and give them a token.',
    'question someone’s sincerity, and give them a token.'
  ],
  mercenary: [
    'ask “what’s in it for me?” and gain a token.',
    'take something while no one is looking, and give the person who needed it a token.',
    'betray someone for your own gain, and give them a token.'
  ],
  maverick: [
    'ask “what here is more complicated than it seems?” and gain a token.',
    'present someone with an enticing option they hadn’t considered, and give them a token.',
    'encourage someone to pursue their own interests over other obligations, and give them a token.'
  ],
  zealous: [
    'state your beliefs, and gain a token.',
    'demand that someone live up to your ideals, and give them a token.',
    'take things too far, and give the one you hurt a token.'
  ],
  attuned: [
    'say something meaningful yet cryptic, and gain a token.',
    'make a declaration about someone’s future, and give them a token.',
    'help someone ask the space between for guidance, and give them a token.'
  ],
  burdened: [
    'sigh deeply, and gain a token.',
    'lash out at someone for something minor, and give them a token.',
    'take on more than you can handle, and give the person who comes to your rescue a token.'
  ],
  innocent: [
    'hope for the best, and gain a token.',
    'ask someone a question they’d rather not answer, and give them a token if they tell the truth.',
    'offer someone physical affection, and give them a token if they accept in a way that is comfortable for them.'
  ],
  ancient: [
    'tell a story of long ago, and gain a token.',
    'draw a parallel between then and now, and gain a token.',
    'ask “how are you going to do better than what came before?” and give them a token.'
  ],
  awkward: [
    'try your best, and gain a token.',
    'misunderstand or ignore a social cue from someone, and give them a token.',
    'ask someone something at a bad time, and give them a token.'
  ],
  ethereal: [
    'watch from somewhere else, and gain a token.',
    'silently change the environment around you, and give the first person to notice a token.',
    'remind someone of what you or they stand for, and give them a token.'
  ]
};

const props = defineProps({
  d66: {
    type: Die66,
    required: true
  }
});

const [category, array] = Object.entries(TRAIT_DATA).at(props.d66.die1);
const trait = array.at(props.d66.die2);
const moves = TRAIT_MOVES[trait];
  </script>

<style scoped lang="scss">
.trait {
  position: relative;

  padding: 1rem;
  height: 100%;

  border-radius: 1rem;
  background-image: linear-gradient(90deg, rgb(#6a474d, 0.1) 80%, rgb(#3d6a79, 0.1));
  backdrop-filter: blur(8px);

  &__name {
    text-transform: uppercase;
    font-weight: 700;
    color: #aec3c4;
  }

  &__category {
    position: absolute;
    top: 0;
    right: 1rem;
    font-variant: small-caps;
    font-weight: 700;
    color: #b54365;
  }

  &__combo {
    display: flex;
    // gap: 1rem;
    &--category {
      // font-variant: small-caps;
      text-transform: uppercase;
      font-weight: 700;
      &::after {
        content: ':';
        // margin-inline: 1rem;
      }
    }
  }

  &__choose {
    font-style: italic;
  }
}
</style>
