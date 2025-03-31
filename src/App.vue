<template>
  <Nav />
  <router-view></router-view>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent } from 'vue';
import { useResourcesStore } from './store/modules/resources';
import CardsWrapper from './components/CardsWrapper.vue';
import Nav from './components/Nav.vue';

export default defineComponent({
  name: 'App',

  components: {
    CardsWrapper,
    Nav
  },

  setup() {
    const resourcesStore = useResourcesStore();

    onBeforeMount(() => {
      resourcesStore.fetchData();
    });
  }
});
</script>
