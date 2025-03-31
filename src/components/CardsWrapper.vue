<template>
  <div class="gap-4 p-4 pb-0 mb-3">
    <button
      class="border border-blue-500 text-blue-600/100 dark:text-blue-600/100 cursor-pointer rounded py-1 px-4"
      type="button"
      @click="fetchTemplates"
    >
      Получить данные шаблонов
    </button>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-0">
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
import { handleResValue } from '../utils';
import type { TItemData } from '../utils/types';
import Card from '../components/Card.vue'

export default defineComponent({
  name: 'CardsWrapper',

  components: {
    Card
  },

  setup() {
    const resourcesStore = useResourcesStore();
    const parentsList = computed(() => resourcesStore.parentsList);
    const templatesList = computed(() => resourcesStore.templatesList);

    const fetchTemplates = async () => {
      const value = JSON.stringify([...templatesList.value].map((item: TItemData) => ({ ...item })));

      try {
        const { data } = await handleResValue(value);

        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      parentsList,
      fetchTemplates
    }
  }
});
</script>
