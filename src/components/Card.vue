<template>
  <div class="bg-white shadow-lg rounded-lg p-4">
    <h2 class="text-xl font-semibold mb-4">{{ index }}) {{ pagetitle }}, ID={{ id }}, parent={{ parent }}</h2>
    <button
      class="text-white bg-blue-500 hover:bg-blue-700 active:bg-blue-800 cursor-pointer rounded py-1 px-4 mb-3"
      type="button"
      @click="fetchResources"
    >
      Получить данные
    </button>
    <ol class="list-decimal list-inside space-y-2 pl-5 mb-3">
      <li
        v-for="item in resources"
        :key="item.id.toString()"
        :class="item.isfolder ?  'text-blue-600/100 dark:text-blue-600/100' : 'text-gray-400/100 dark:text-gray-400/100'"
      >
        {{ item.pagetitle }}, id={{ item.id.toString() }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { handleResValue } from '../utils';
import type { TItemData } from '../utils/types';

export default defineComponent({
  name: 'Card',

  props: {
    index: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    pagetitle: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: false,
    },
    published: {
      type: Boolean,
      required: false,
    },
    parent: {
      type: String,
      required: true,
    },
    isfolder: {
      type: Boolean,
      required: true,
    },
    children: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const resources = computed(() => props.children ? [...props.children] as TItemData[] : [] as TItemData[]);

    const fetchResources = async () => {
      const value = JSON.stringify(props.children ? [...props.children as TItemData[]].map(item => ({ ...item })) : []);

      try {
        const { data } = await handleResValue(value);

        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      resources,
      fetchResources
    }
  },
});
</script>
