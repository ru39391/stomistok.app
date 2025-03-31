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
        v-for="item in children"
        :key="item.id"
        :class="item.isfolder ?  'text-blue-600/100 dark:text-blue-600/100' : 'text-gray-400/100 dark:text-gray-400/100'"
      >
        {{ item.pagetitle }}, id={{ item.id.toString() }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
      required: false,
    },
    isfolder: {
      type: Boolean,
      required: false,
    },
    children: {
      type: Array,
      required: false,
    },
  },

  setup(props) {
    const fetchResources = async () => {
      const value = JSON.stringify([...props.children].map((item: TItemData) => ({ ...item })));

      try {
        const { data } = await handleResValue(value);

        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      fetchResources
    }
  },
});
</script>
