import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  ID_KEY,
  PARENT_KEY,
  API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
} from '../../utils/constants';

import type { TItemData, TParentData } from '../../utils/types';

const useResourcesStore = defineStore('resources', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const resList = ref<TItemData[]>([]);
  const parentsList = ref<TParentData[]>([]);

  const resetData = () => {
    setLoading(true);
    setItemsList({});
  };

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setItemsList = (parents: Record<string, number>, resources: TItemData[] = []) => {
    if(!resources.length) {
      resList.value = [];
      parentsList.value = [];
    }

    resList.value = [...resources];

    for (const key in parents) {
      const data = resources.find(res => res[ID_KEY] === parents[key]);
      const children = resources.filter(res => res[PARENT_KEY] === parents[key]);

      // TODO: добавить столбец с ресурсов с parent= 0
      // TODO: настроить обработку неопубликованных категорий
      // TODO: настроить сортировку категорий по id
      parentsList.value = data ? [...parentsList.value, { ...data, children }] : parentsList.value;
    };
  };

  const fetchData = async () => {
    resetData();

    try {
      const response = await fetch(`${API_URL}resource`);

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { success, data } = await response.json();

      if(!success) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { parents, resources } = data;

      console.log(data);
      setItemsList(parents, resources);
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    alertMessage,
    resList,
    parentsList,
    setLoading,
    fetchData,
  };
});

export { useResourcesStore };
