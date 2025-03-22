<template>
  <CardsWrapper />
</template>

<script lang="ts">
import { onBeforeMount, defineComponent } from 'vue';
import { useResourcesStore } from './store/modules/resources';
import CardsWrapper from './components/CardsWrapper.vue'

export default defineComponent({
  name: 'App',

  components: {
    CardsWrapper
  },

  setup() {
    const resourcesStore = useResourcesStore();

    onBeforeMount(() => {
      resourcesStore.fetchData();
    });

    return {
    }
  }
});
</script>
