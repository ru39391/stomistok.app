import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  ID_KEY,
  PARENT_KEY,
  PAGETITLE_KEY,
  API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
} from '../../utils/constants';

import { sortArrValues } from '../../utils';

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

    const parentsExtList = sortArrValues(
      Object.values(parents).map(item => ({ [ID_KEY]: item })),
      ID_KEY
    ).reduce((acc, item) => ({ ...acc, [item[ID_KEY]]: item[ID_KEY] }), {});
    const resExtList = [
      ...resources,
      { [ID_KEY]: 0, [PARENT_KEY]: 0, [PAGETITLE_KEY]: 'Website' },
      { [ID_KEY]: 8, [PARENT_KEY]: 2, [PAGETITLE_KEY]: 'ДЕТСКОЕ ОТДЕЛЕНИЕ' },
      { [ID_KEY]: 168, [PARENT_KEY]: 18, [PAGETITLE_KEY]: 'Рефлексотерапия' },
      { [ID_KEY]: 230, [PARENT_KEY]: 0, [PAGETITLE_KEY]: 'Хайлайты' },
      { [ID_KEY]: 240, [PARENT_KEY]: 243, [PAGETITLE_KEY]: 'Тестирование и разработка' },
    ];

    resList.value = [...resources];

    for (const key in parentsExtList) {
      const data = resExtList.find(res => res[ID_KEY] === parentsExtList[key]);
      const children = resources.filter(res => res[PARENT_KEY] === parentsExtList[key]);

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
