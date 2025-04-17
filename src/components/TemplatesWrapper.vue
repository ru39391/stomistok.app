<template>
  <div class="p-4">
    <TemplateCard
      v-for="item in templatesList"
      :key="item.id.toString()"
      :id="item.id.toString()"
      :name="item.templatename.toString()"
      :desc="item.description.toString()"
      :varsList="item.vars"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useResourcesStore } from '../store/modules/resources';
import TemplateCard from '../components/TemplateCard.vue'

export default defineComponent({
  name: 'CardsWrapper',

  components: {
    TemplateCard
  },

  setup() {
    const resourcesStore = useResourcesStore();
    const templatesList = computed(() => resourcesStore.templatesList);

    return {
      templatesList
    }
  }
});
</script>
