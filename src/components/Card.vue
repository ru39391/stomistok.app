<template>
  <div class="bg-white shadow-lg rounded-lg p-4">
    <h2 class="text-xl font-semibold mb-4">{{ index }}) {{ pagetitle }}, ID={{ id }}, parent={{ parent }}</h2>
    <ol class="list-decimal list-inside pl-5 space-y-2">
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
});
</script>
