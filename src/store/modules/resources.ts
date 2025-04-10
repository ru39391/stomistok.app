import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  ID_KEY,
  CLASS_KEY,
  PARENT_KEY,
  PAGETITLE_KEY,
  PUBLISHED_KEY,
  API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
} from '../../utils/constants';

import { sortArrValues } from '../../utils';

import type { TCustomValues, TItemData, TParentData } from '../../utils/types';

const useResourcesStore = defineStore('resources', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const pagesList = ref<TItemData[]>([]);
  const featuresList = ref<TItemData[]>([]);
  const parentsList = ref<TItemData[]>([]);
  const templatesList = ref<TItemData[]>([]);

  const resetData = () => {
    setLoading(true);
    setItemsList({});
    setTemplatesList();
  };

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setTemplatesList = (templates: TItemData[] = []) => {
    templatesList.value = [...templates].map(
      item => ({ ...item, content: `{include 'file:templates/${item.content.toString().split(' ')[1]}}` })
    );
  };

  const setItemsList = (parents: number[], data: Record<string, TItemData[]> | null = null) => {
    if(!data) {
      pagesList.value = [];
      featuresList.value = [];
      parentsList.value = [];
    }

    const sortResArr = (arr: TItemData[]): TItemData[] => sortArrValues(
      [...arr] as TCustomValues[],
      PARENT_KEY
    ).map((item, index) => ({ ...item, idx: index + 1 })) as TItemData[];

    const [pages, features] = data ? Object.values(data) as TItemData[][] : [[], []] as TItemData[][];

    pagesList.value = sortResArr(pages);
    featuresList.value = sortResArr(features);
    parentsList.value = [...pages, ...features].reduce(
      (acc, item) => parents.includes(item[ID_KEY] as number) ? [...acc, item] : acc,
      [] as TItemData[]
    );
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

      const { parents, pages, features, templates } = data;

      console.log(data);
      setTemplatesList(templates);
      setItemsList(parents, { pages, features });
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createData = async (body: string, isResource: boolean = true) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}resource${isResource ? '' : `/1`}`,
        { method: 'POST', body }
      );

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { success, data } = await response.json();

      if(!success) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      console.log(data);
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
    pagesList,
    featuresList,
    parentsList,
    templatesList,
    setLoading,
    fetchData,
    createData
  };
});

export { useResourcesStore };
