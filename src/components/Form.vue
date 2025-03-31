<template>
  <div class="p-4">
    <div class="grid grid-cols-2">
      <textarea
        class="w-full border border-gray-300 rounded-lg focus:outline-none focus:shadow-sm p-3 mb-4"
        v-model="data"
      ></textarea>
    </div>
    <div class="flex items-center text-white gap-5">
      <button
        :disabled="isBtnDisabled"
        class="border border-blue-500 text-blue-600/100 disabled:text-gray-300 disabled:border-gray-300 disabled:cursor-default cursor-pointer rounded py-1 px-4"
        type="button"
        @click="createTemplates"
      >
        Создать шаблоны
      </button>
      <button
        :disabled="isBtnDisabled"
        class="text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-default cursor-pointer rounded py-1 px-4"
        type="button"
        @click="createResources"
      >
        Сохранить ресурсы
      </button>
      <button
        class="border border-gray-400 text-gray-600 cursor-pointer rounded py-1 px-4"
        type="button"
        @click="resetForm"
      >
        Очистить форму
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useResourcesStore } from '../store/modules/resources';

export default defineComponent({
  name: 'Form',

  setup() {
    const resourcesStore = useResourcesStore();
    const data = ref('');
    const isBtnDisabled = computed(() => !data.value);

    const resetForm = () => {
      data.value = '';
    };

    const createResources = () => resourcesStore.createData(data.value);

    const createTemplates = () => resourcesStore.createData(data.value, false);

    return {
      data,
      isBtnDisabled,
      resetForm,
      createResources,
      createTemplates
    }
  },
});
</script>
