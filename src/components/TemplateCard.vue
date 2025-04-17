<template>
  <div class="p-4">
    <h2 class="text-lg mb-1">{{ id }}. {{ name }}</h2>
    <h3 class="text-base font-semibold mb-3">{{ desc }}</h3>
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md" v-if="varsList.length > 0">
      <thead class="bg-gray-500 text-white">
        <tr>
          <th class="px-4 py-2 text-left">#</th>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Название</th>
          <th class="px-4 py-2 text-left">Заголовок</th>
          <th class="px-4 py-2 text-left">Описание</th>
          <th class="px-4 py-2 text-left">Тип</th>
          <th class="px-4 py-2 text-left">Отображение</th>
        </tr>
      </thead>
      <tbody>
        <TemplateRow
          v-for="({id, name, description, type, display, caption}, index) in variables"
          :key="id.toString()"
          :index="(index + 1).toString()"
          :id="id.toString()"
          :name="name.toString()"
          :desc="description.toString()"
          :type="type.toString()"
          :display="display.toString()"
          :caption="caption.toString()"
        />
      </tbody>
    </table>
    <h3 class="text-sm mb-3" v-else>Нет доп. полей, соответствующих шаблону</h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TemplateRow from '../components/TemplateRow.vue'
import type { TItemData } from '../utils/types';

export default defineComponent({
  name: 'TemplateCard',

  components: {
    TemplateRow
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    varsList: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const variables = computed(() => [...props.varsList] as TItemData[]);

    return {
      variables
    }
  }
});
</script>
