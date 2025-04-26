import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  ID_KEY,
  CLASS_KEY,
  PARENT_KEY,
  API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
} from '../../utils/constants';

import { sortArrValues } from '../../utils';

import type { TCustomValues, TItemData, TTemplateData } from '../../utils/types';

const useResourcesStore = defineStore('resources', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const pagesList = ref<TItemData[]>([]);
  const featuresList = ref<TItemData[]>([]);
  const parentsList = ref<TItemData[]>([]);
  const templatesList = ref<TTemplateData[]>([]);

  const resetData = () => {
    setLoading(true);
    setItemsList([]);
    setTemplatesList();
  };

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setTemplatesList = (variables: TItemData[] = [], templates: (TItemData & { vars: number[] })[] = []) => {
    if(!templates.length) {
      templatesList.value = [];
    }

    templatesList.value = [...templates].map(
      item => ({
        ...item,
        content: `{include 'file:templates/${item.content.toString().split(' ')[1]}}`,
        vars: item.vars.reduce((acc, id: number) => {
          const data = variables.find(data => Number(data[ID_KEY]) === id);

          return data ? [...acc, data] : acc;
        }, [] as TItemData[])
      })
    ) as TTemplateData[];
  };

  const setItemsList = (parents: number[], data: Record<string, TItemData[]> | null = null) => {
    if(!data) {
      pagesList.value = [];
      featuresList.value = [];
      parentsList.value = [];
    }

    const sortResArr = (arr: TItemData[]): TItemData[] => sortArrValues(
      [...arr].filter(item => ![40,230,243,356].includes(item[ID_KEY] as number)) as TCustomValues[],
      PARENT_KEY
    ).map(
      (item, index) => ({ ...item, idx: index + 1, [CLASS_KEY]: `MODX\\Revolution\\${item[CLASS_KEY] ===  'modWebLink' ? 'modWebLink' : 'modDocument'}` })
    ) as TItemData[];

    const [pages, features] = data ? Object.values(data) as TItemData[][] : [[], []] as TItemData[][];
    const [pagesSorted, featuresSorted] = [sortResArr(pages), sortResArr(features)];

    pagesList.value = pagesSorted;
    featuresList.value = featuresSorted.map(item => {
      const featureDepts = JSON.parse(`[${item.depts}]`);
      const featureSubdepts = JSON.parse(`[${item.subdepts}]`);
      const depts = pagesSorted.filter(data => [...featureDepts].includes(data[ID_KEY]));
      const subdepts = pagesSorted.filter(data => [...featureSubdepts].includes(data[ID_KEY]));

      return {
        ...item,
        // TODO: удалять из subdepts значения, совпадающие с depts
        depts: depts.length > 0 ? JSON.stringify([...depts].map(({ idx }) => idx)) : '',
        subdepts: depts.length > 0 ? JSON.stringify([...subdepts].map(({ idx }) => idx)) : ''
      }
    });
    parentsList.value = [...pages, ...features].reduce(
      (acc, item) => parents.includes(item[ID_KEY] as number) ? [...acc, item] : acc,
      [] as TItemData[]
    ).map(item => {
      const data = [...pagesSorted, ...featuresSorted].find(res => res[ID_KEY] === item[ID_KEY]);

      return data ? {...item, ...data} : item;
    });
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

      const { parents, pages, features, templates, variables } = data;

      console.log(data);
      setTemplatesList(variables, templates);
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
