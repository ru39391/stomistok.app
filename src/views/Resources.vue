<template>
  <CardsWrapper />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardsWrapper from '../components/CardsWrapper.vue';

export default defineComponent({
  name: 'Category',

  components: {
    CardsWrapper
  },
});
</script>
