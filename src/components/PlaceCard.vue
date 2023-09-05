<template>
  <div class="place">
    <!-- <h1 class="place__combo">
      <span class="place__combo--category">{{ category }}</span>
      <span class="place__combo--name">{{ place }}</span>
    </h1> -->
    <h3 class="place__category">{{ category }}</h3>
    <h1 class="place__name">{{ place }}</h1>

    <span class="place__heading">Aesthetic Elements:</span>
    <ul>
      <li v-for="die in aestheticDice" :key="die">{{ aesthetic[die] }}</li>
    </ul>

    <span class="place__heading">Rumored To Be Here:</span>
    <ul>
      <li v-for="die in rumorsDice" :key="die">{{ rumors[die] }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Die66, dieN } from '@/composables/dice';

const PLACE_DATA = {
  natural: ['swamp', 'forest', 'desert', 'ocean', 'tundra', 'storm'],
  war: ['base', 'bureaucracy', 'weapon', 'battleground', 'laboratory', 'infirmary'],
  crowded: ['metropolis', 'alley', 'market', 'farm', 'bar', 'gala'],
  forgotten: ['hallow', 'mountain', 'ruin', 'shipwreck', 'cave', 'junkyard'],
  liminal: ['asteroid', 'void', 'spaceport', 'caravan', 'gateway', 'mirage'],
  intimate: ['cliff', 'library', 'workshop', 'ship', 'quarters', 'academy']
};

const PLACE_DETAILS = {
  swamp: {
    aesthetic: [
      'towering dunes',
      'many suns in the sky',
      'strange pillars of metal',
      'half-buried abandoned spaceships',
      'mirages in the mist',
      'a vicious and solitary creature'
    ],
    rumors: [
      'an oasis with healing waters',
      'an underground alien culture',
      'a coven of prophets',
      'a field of glass'
    ]
  },
  forest: {
    aesthetic: [
      'water that seeps into your clothes',
      'heaviness in the air',
      'hostile flora',
      'bubbling mud',
      'swarms of bugs',
      'slow and lumbering creatures'
    ],
    rumors: [
      'a strange but kind swamp creature',
      'a nova training in solitude',
      'a lost artifact',
      'a portal to the planet lost to time'
    ]
  },
  desert: {
    aesthetic: [
      'towering trees',
      'exposed roots',
      'a constant downpour of rain',
      'sunlight barely peeking through',
      'a hidden waterfall',
      'camouflaged creatures'
    ],
    rumors: [
      'a community of small furry creatures',
      'an ancient library of nova texts',
      'an ongoing guerrilla war',
      'sentient wind with the voice of a human'
    ]
  },
  ocean: {
    aesthetic: [
      'freezing rain',
      'sprawling plains of white',
      'barren trees',
      'puffy coats',
      'tracks in the snow',
      'habitable domes'
    ],
    rumors: [
      'hail the size of spaceships',
      'a short-staffed base operated by the liberation',
      'a behemoth of legend buried deep in the ice',
      'the beginnings of a great melting'
    ]
  },
  tundra: {
    aesthetic: [
      'water so deep it might as well be bottomless',
      'small islands with sandy beaches',
      'wrecked spaceships rusting in the deep',
      'strange-looking creatures that defy research',
      'underwater volcanoes',
      'violent storms'
    ],
    rumors: [
      'the wreckage of an old war hero’s ship',
      'rare minerals worth a fortune',
      'unpredictable and unforgiving tides',
      'mermaids offering gifts'
    ]
  },
  storm: {
    aesthetic: [
      'howling winds',
      'flashes of light',
      'flying debris',
      'clouds of dust',
      'a strange rhythm',
      'distant singing'
    ],
    rumors: [
      'an eye',
      'the voice of an old god',
      'a synthetic source',
      'the answer to a terrifying question'
    ]
  },
  base: {
    aesthetic: [
      'ships in hangars',
      'projected maps',
      'hushed discussions of battle and loss',
      'casual card games played with drinks in hand',
      'eager new recruits',
      'soldiers recovering from wounds'
    ],
    rumors: [
      'an emissary returned',
      'a stolen mandate secret',
      'the next hot-shot pilot',
      'a vigil for the dead'
    ]
  },
  bureaucracy: {
    aesthetic: [
      'long bare hallways',
      'idle chit-chat',
      'self-important uniforms',
      'over-complicated language',
      'evil turned banal',
      'hovering water coolers'
    ],
    rumors: [
      'a meeting with almost every upper mandate officer',
      'the holding cell for a few liberation prisoners',
      'plans for a new and powerful technology',
      'the paperwork needed to get a new pilot’s license'
    ]
  },
  weapon: {
    aesthetic: [
      'a silent air of domination',
      'absurd formality',
      'glee in horrific destruction',
      'unfettered jingoism and pride',
      'cold and calculated violence',
      'a looming and threatening presence'
    ],
    rumors: [
      'a secret vulnerability',
      'the largest mandate prison in the system',
      'a liberation spy in deep cover',
      'a sinister and ruinous plan'
    ]
  },
  battleground: {
    aesthetic: [
      'dilapidated tents',
      'destroyed landscapes',
      'the cacophony of battle',
      'long days',
      'close calls',
      'solidarity among survivors'
    ],
    rumors: [
      'a new kind of weapon',
      'reinforcements on the way',
      'strategy with little regard for life',
      'the last chance we have'
    ]
  },
  laboratory: {
    aesthetic: [
      'bubbling vials',
      'note-covered whiteboards',
      'murmurs of new innovations',
      'exhausted and overworked scientists',
      'creatures in cages',
      'an air of importance'
    ],
    rumors: [
      'a serious security system',
      'a kidnapped engineer',
      'a terrifying and deadly discovery',
      'the full version of a redacted report'
    ]
  },
  infirmary: {
    aesthetic: [
      'bloodied shirts',
      'crowded beds',
      'screams of pain',
      'kind nurses trying their best',
      'the smell of antiseptic',
      'automated doctors with constant glitches'
    ],
    rumors: ['scarce supplies', 'the sole survivor of an ambush', 'an old friend', 'the antidote']
  },
  hallow: {
    aesthetic: [
      'a low murmur',
      'towers of books and scrolls',
      'the weight of history',
      'a glowing crystal which shows the future',
      'a thick layer of dust',
      'a mirror of polished dark stone'
    ],
    rumors: [
      'the remains of the first star',
      'an intricate machine too old to understand',
      'a scroll that decodes an ancient nova cypher',
      'an astrablade of the eridian war'
    ]
  },
  mountain: {
    aesthetic: [
      'the setting sun',
      'the whipping wind',
      'jagged rocks',
      'a forgotten campsite',
      'a view of everything',
      'narrow and winding paths'
    ],
    rumors: [
      'an impossible climb',
      'a tear in the space between',
      'a sleeping giant',
      'an isolated culture'
    ]
  },
  ruin: {
    aesthetic: [
      'crumbling pillars',
      'a monument to an unknown god',
      'the lingering shadow of war',
      'security measures to make sure no one touches the remains',
      'tourist traps',
      'a lonely and profound silence'
    ],
    rumors: [
      'an ancient curse',
      'a secret mandate excavation',
      'a dark conspiracy that caused its destruction',
      'ghosts'
    ]
  },
  shipwreck: {
    aesthetic: [
      'rusting metal',
      'plants reclaiming its surface',
      'an old and strange-looking model',
      'flashing lights',
      'a giant crater',
      'subtle hints that there is a greater mystery',
      'a sense of majesty despite the disrepair'
    ],
    rumors: [
      'someone or something else living there now',
      'a long-lost treasure',
      'the stored memory of its captain',
      'nothing left of any value at this point'
    ]
  },
  cave: {
    aesthetic: [
      'barely enough light to see',
      'damp walls and slippery ground',
      'bioluminescent flora growing in cracks',
      'rock formations jutting out when you least expect it',
      'creatures slithering around the floor and walls',
      'a pronounced echo'
    ],
    rumors: [
      'a creature truly unknowable and alien',
      'the lingering spirits of those who die here',
      'the remnants of an old crystal mine',
      'nothing at all but a cold damp darkness'
    ]
  },
  junkyard: {
    aesthetic: [
      'mountains of rusting metal',
      'smoke hanging in the air',
      'overpowering sounds of machinery',
      'a barbed wire fence',
      'not another soul in sight',
      'signs warning to keep out'
    ],
    rumors: [
      'an old spaceship with a surprisingly fast engine',
      'droid parts for cheap',
      'more than a few illegal dealings',
      'not quite what we’re looking for but close enough'
    ]
  },
  metropolis: {
    aesthetic: [
      'towering skyscrapers',
      'shining chrome',
      'holographic billboards with cheery advertisements',
      'absurd and extravagant fashion',
      'a monorail',
      'a projected blue sky'
    ],
    rumors: [
      'a shady politician who will aid anyone for the right price',
      'the high nova conclave',
      'an exiled scion',
      'manufacturers of illegal goods'
    ]
  },
  alley: {
    aesthetic: [
      'cramped walkways',
      'eclectic apartments',
      'clotheslines crisscrossing the streets',
      'smog in the air',
      'a feeling of community',
      'children playing'
    ],
    rumors: [
      'an infamous smuggler who retired long ago',
      'a young girl with prophetic abilities',
      'constant mandate surveillance',
      'preparations for a festival'
    ]
  },
  market: {
    aesthetic: [
      'an air of business',
      '“most wanted” posters with familiar faces',
      'rare and beautiful fabrics',
      'overpriced trinkets',
      'loud and stubborn haggling',
      'free samples'
    ],
    rumors: [
      'fuel crystals on the cheap',
      'a former lover',
      'detachments on patrol',
      'the best street food in the sector'
    ]
  },
  farm: {
    aesthetic: [
      'crops as far as the eye can see',
      'automated machinery hovering just above',
      'a small cluster of homes on the fringes',
      'tired workers',
      'the lingering effects of a mandate attack',
      'lumbering alien creatures kept as livestock'
    ],
    rumors: [
      'an old retired nova with stories of the eridian war',
      'a childhood best friend',
      'a long-lost scion hidden away for their own safety',
      'a burgeoning liberation cell formed by disgruntled workers'
    ]
  },
  bar: {
    aesthetic: [
      'a live band in the corner',
      'shady figures looking for work',
      'an ongoing arm wrestling match',
      'gossip thrown left and right',
      'mandate soldiers on leave',
      'drunken smiles'
    ],
    rumors: [
      'an illicit gambling operation',
      'someone you still owe',
      'the second fastest smuggler in the system',
      'a bartender with revolutionary sympathies'
    ]
  },
  gala: {
    aesthetic: [
      'fake smiles',
      'genuine sneers',
      'offensively expensive suits',
      'vaguely upbeat music',
      'idle gossip',
      'beautiful and extravagant decorations'
    ],
    rumors: [
      'at least one person who recently committed a war crime',
      'poker tables that could bankrupt a midsized planet in a single hand',
      'a liberation spy in deep cover',
      'your old celebrity crush'
    ]
  },
  cliff: {
    aesthetic: [
      'a beautiful meadow',
      'sight of the water below',
      'strong winds',
      'the nests of flying creatures',
      'a feeling of calm',
      'big boulders'
    ],
    rumors: [
      'a lost nova living as a hermit',
      'rare flora which only bloom at night',
      'the perfect spot for a ship to take off',
      'an old abandoned mandate telescope'
    ]
  },
  library: {
    aesthetic: [
      'towering shelves of books',
      'a thick layer of dust',
      'unfamiliar names from long ago',
      'strict rules against taking books out',
      'a clock ticking',
      'windows letting light pour in'
    ],
    rumors: [
      'the original draft of the nova code',
      'secret copies of books banned by the mandate',
      'a friendly librarian who loves to help find things',
      'a scandalous romance section'
    ]
  },
  workshop: {
    aesthetic: [
      'the whirring sounds of machines',
      'an assortment of niche tools',
      'unfinished projects piled up in the corner',
      'helper droids running to and fro',
      'an air of focus and concentration',
      'something huge being repaired which takes up most of the space'
    ],
    rumors: [
      'a special tool needed to build an astrablade',
      'the best hover-tech engineer in the system',
      'a retired liberation pilot using their skills to repair old ships',
      'unbeatable deals on repairs if you know who to talk to'
    ]
  },
  ship: {
    aesthetic: [
      'exposed wires',
      'flashing lights',
      'cramped spaces',
      'shouted commands',
      'random patches of duct tape',
      'a bumpy ride'
    ],
    rumors: [
      'forged ownership papers',
      'dangerously out-of-date parts',
      'a mandate ship following close behind',
      'nothing special! i promise! it’s just an old spaceship; you’ve got to believe me! '
    ]
  },
  quarters: {
    aesthetic: [
      'pictures on the walls',
      'memories from a different life',
      'a steady routine',
      'a cluttered desk',
      'hidden snacks',
      'something… off about this whole thing'
    ],
    rumors: ['an old friend', 'a concealed weapon', 'incriminating evidence', 'a place to rest']
  },
  academy: {
    aesthetic: [
      'bored students',
      'hallway chatter',
      'rows of lockers',
      'intense lectures on science and philosophy',
      'writing on the walls',
      'an upcoming student election'
    ],
    rumors: [
      'children kidnapped and trained in secret',
      'student protests suppressed by administration',
      'new halls under construction',
      'a hangout from your childhood'
    ]
  },
  asteroid: {
    aesthetic: [
      'cracks and crevices',
      'view of the vast ocean of stars',
      'veins of shining metal',
      'a feeling of precarity',
      'a feeling of weightlessness',
      'the unimpeded cold of space'
    ],
    rumors: [
      'just enough time to refuel',
      'an obstacle to passing ships',
      'an abandoned helper droid',
      'microscopic life forms used to extreme environments'
    ]
  },
  void: {
    aesthetic: [
      'stars twinkling in the distance',
      'not a soul in sight',
      'fuel running out',
      'tensions running high',
      'ringing in your ears',
      'nothing to do but wait around'
    ],
    rumors: [
      'a path we’re supposed to follow',
      'foreign objects that make dangerous projectiles',
      'a habitable planet nearby',
      'a long journey ahead'
    ]
  },
  caravan: {
    aesthetic: [
      'a slow pace',
      'whispered secrets',
      'marks of otherness',
      'a lingua franca',
      'curious children',
      'weary travelers'
    ],
    rumors: [
      'an expert of navigation',
      'the finest crafts credits can buy',
      'a cult of the space between',
      'mutual aid'
    ]
  },
  spaceport: {
    aesthetic: [
      'painfully long lines',
      'diverse cultures and fashions',
      'blaring announcements',
      'secret passageways',
      'overpriced snacks',
      'some time to breathe'
    ],
    rumors: [
      'a huge shipment of smuggled goods',
      'an important politician and their entourage',
      'the only direct flight to an out-of-the-way planet',
      'news from home'
    ]
  },
  gateway: {
    aesthetic: [
      'warping light',
      'unknown constellations',
      'glimpses into another plane',
      'a station to dock and buy entrance',
      'a scientific expedition',
      'a pulsating energy'
    ],
    rumors: [
      'the only way out',
      'an ambush on the other side',
      'the consequences of a failed experiment long ago',
      'something calling out into the darkness'
    ]
  },
  mirage: {
    aesthetic: [
      'everything out of focus',
      'swirling lights',
      'someone you remember but not like this',
      'an answer just out of reach',
      'beautiful flora',
      'the urge to cry'
    ],
    rumors: [
      'a celebration',
      'someone who went missing years ago',
      'something more sinister than what it seems',
      'nothing at all—that’s what doesn’t make sense'
    ]
  }
};

const props = defineProps({
  d66: {
    type: Die66,
    required: true
  }
});

const [category, array] = Object.entries(PLACE_DATA).at(props.d66.die1);
const place = array.at(props.d66.die2);
const { aesthetic, rumors } = PLACE_DETAILS[place];

const aestheticDice = new Set<number>();
while (aestheticDice.size < 3) {
  const die = dieN(aesthetic.length);
  if (!aestheticDice.has(die)) aestheticDice.add(die);
}
const rumorsDice = new Set<number>();
while (rumorsDice.size < 2) {
  const die = dieN(rumors.length);
  if (!rumorsDice.has(die)) rumorsDice.add(die);
}
</script>

<style scoped lang="scss">
.place {
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

  &__heading {
    color: #aec3c4;
    font-weight: 700;
  }
}
</style>
