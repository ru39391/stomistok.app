<template>
  <tr class="border-t border-gray-300">
    <td class="px-4 py-2">{{ index }}</td>
    <td class="px-4 py-2">{{ id }}</td>
    <td class="px-4 py-2">{{ name }}</td>
    <td class="px-4 py-2">{{ caption }}</td>
    <td class="px-4 py-2">{{ desc }}</td>
    <td class="px-4 py-2">{{ type }}</td>
    <td class="px-4 py-2">{{ display }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TemplateRow',

  props: {
    index: {
      type: String,
      required: true,
    },
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
    type: {
      type: String,
      required: false,
    },
    display: {
      type: String,
      required: false,
    },
    caption: {
      type: String,
      required: false,
    },
  },
});
</script>
