<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <Card
      v-for="(item, index) in parentsList"
      :index="index + 1"
      :key="item.id"
      :id="item.id.toString()"
      :pagetitle="item.pagetitle"
      :uri="item.uri"
      :published="item.published"
      :parent="item.parent.toString()"
      :isfolder="item.isfolder"
      :children="item.children"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useResourcesStore } from '../store/modules/resources';
import Card from '../components/Card.vue'

export default defineComponent({
  name: 'CardsWrapper',

  components: {
    Card
  },

  setup() {
    const resourcesStore = useResourcesStore();
    const parentsList = computed(() => resourcesStore.parentsList);

    return {
      parentsList
    }
  }
});
</script>
