<template>
  <tr
    :class="[
      'border-t border-gray-300',
      { 'bg-gray-100': isfolder },
    ]"
    @click="getItemData()"
  >
    <td class="px-4 py-2">{{ index }}</td>
    <td class="px-4 py-2">{{ id }}</td>
    <td class="px-4 py-2">{{ pagetitle }}</td>
    <td class="px-4 py-2">{{ category.id }}</td>
    <td class="px-4 py-2">{{ parent }}</td>
    <td
      :class="[
        'px-4 py-2',
        { 'line-through': category.isUnpublished }
      ]"
    >{{ category.title }}</td>
    <td class="px-4 py-2" v-if="false">{{ class_key }}</td>
  </tr>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ID_KEY, PAGETITLE_KEY, PUBLISHED_KEY } from '../utils/constants';
import type { TItemData } from '../utils/types';

export default defineComponent({
  name: 'Row',

  props: {
    index: {
      type: String,
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
    class_key: {
      type: String,
      required: true,
    },
    isfolder: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    parentsList: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const category = computed(() => {
      const data = [...props.parentsList as TItemData[]].find(item => item[ID_KEY] === Number(props.parent));

      return {
        id: data && data.idx ? data.idx.toString() : '',
        title: data ? data[PAGETITLE_KEY] : '',
        isUnpublished: data ? !data[PUBLISHED_KEY] : false
      };
    });

    const getItemData = () => {
      //console.log({...props.item});
    };

    return {
      category,
      getItemData
    }
  },
});
</script>
