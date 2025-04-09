<template>
  <div class="flex gap-4 p-4 pb-0 mb-3">
    <button
      class="border border-blue-500 text-blue-600/100 dark:text-blue-600/100 cursor-pointer rounded py-1 px-4"
      type="button"
      @click="fetchTemplates"
    >
      Получить данные шаблонов
    </button>
    <button
      class="border bg-blue-500/100 dark:bg-blue-500/100 text-white cursor-pointer rounded py-1 px-4"
      type="button"
      @click="fetchResources"
    >
      Получить данные ресурсов
    </button>
  </div>
  <div class="p-4">
    <!-- // TODO: настроить переключатель для таблицы -->
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <thead class="bg-gray-500 text-white">
        <tr>
          <th class="px-4 py-2 text-left">#</th>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Заголовок</th>
          <th class="px-4 py-2 text-left">ID категории, новый</th>
          <th class="px-4 py-2 text-left">ID категории</th>
          <th class="px-4 py-2 text-left">Категория</th>
        </tr>
      </thead>
      <tbody>
        <Row
          v-for="item in resList"
          :index="item.idx"
          :key="item.id.toString()"
          :id="item.id.toString()"
          :item="item"
          :pagetitle="item.pagetitle.toString()"
          :parent="item.parent.toString()"
          :isfolder="Boolean(item.isfolder)"
          :parentsList="parentsList"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ID_KEY, PARENT_KEY } from '../utils/constants';
import { useResourcesStore } from '../store/modules/resources';
import { handleResValue } from '../utils';
import type { TItemData } from '../utils/types';
import Row from '../components/Row.vue'

export default defineComponent({
  name: 'CardsWrapper',

  components: {
    Row
  },

  setup() {
    const resourcesStore = useResourcesStore();
    const resList = computed(() => resourcesStore.resList);
    const parentsList = computed(() => resourcesStore.parentsList);
    const templatesList = computed(() => resourcesStore.templatesList);

    const fetchTemplates = async () => {
      const value = JSON.stringify([...templatesList.value].map((item: TItemData) => ({ ...item })));

      try {
        await handleResValue(value);

        console.log('tpl data is copied!');
      } catch (error) {
        console.error(error);
      }
    };

    const fetchResources = async () => {
      const arr = [...resList.value].map((item: TItemData, _, arr) => {
        const parentData = arr.find(data => data[ID_KEY] === item[PARENT_KEY]);

        return { ...item, [ID_KEY]: item.idx, ...(parentData && { [PARENT_KEY]: parentData.idx })};
      });

      try {
        await handleResValue(JSON.stringify(arr));

        console.log('res data is copied!');
        console.log(arr);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      resList,
      parentsList,
      fetchTemplates,
      fetchResources
    }
  }
});
</script>
