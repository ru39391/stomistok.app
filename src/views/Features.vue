<template>
  <CardsWrapper :resList="resList" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useResourcesStore } from '../store/modules/resources';
import CardsWrapper from '../components/CardsWrapper.vue';

export default defineComponent({
  name: 'Features',

  components: {
    CardsWrapper
  },

  setup() {
    const resourcesStore = useResourcesStore();
    const resList = computed(() => resourcesStore.featuresList);

    return {
      resList
    }
  },
});
</script>
