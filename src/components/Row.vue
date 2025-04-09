<template>
  <tr
    :class="[
      'border-t border-gray-300',
      { 'bg-gray-100': isfolder },
      { 'bg-slate-300 text-stone-700 border-zinc-400': isPageFeature },
      { 'bg-red-400 text-white border-zinc-400': category.title !== category.subtitle }
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
    >{{ category.title }}<template v-if="category.title !== category.subtitle"> - {{ category.subtitle }}</template></td>
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
      const index = data.idx as number || data[ID_KEY] as number;
      const extData = [...props.parentsList as TItemData[]].find(item => Number(item.idx) === index);

      return {
        id: data ? index.toString() : '' as string,
        title: data ? data[PAGETITLE_KEY].toString() : '' as string,
        subtitle: extData ? extData[PAGETITLE_KEY].toString() : '' as string,
        isUnpublished: Boolean(!data[PUBLISHED_KEY])
      };
    });

    const isPageFeature = computed(() => [40,230,240,243,356].includes(Number(props.parent)));

    const getItemData = () => {
      //console.log({...props.item});
    };

    return {
      category,
      isPageFeature,
      getItemData
    }
  },
});
</script>
