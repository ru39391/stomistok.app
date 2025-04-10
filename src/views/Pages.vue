<template>
  <CardsWrapper :resList="resList" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useResourcesStore } from '../store/modules/resources';
import CardsWrapper from '../components/CardsWrapper.vue';

export default defineComponent({
  name: 'Pages',

  components: {
    CardsWrapper
  },

  setup() {
    const resourcesStore = useResourcesStore();
    const resList = computed(() => resourcesStore.pagesList);

    return {
      resList
    }
  },
});
</script>
