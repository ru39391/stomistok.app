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
  const resList = ref<TItemData[]>([]);
  const parentsList = ref<TParentData[]>([]);
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

  const setItemsList = (parents: Record<string, number>, resources: TItemData[] = []) => {
    if(!resources.length) {
      resList.value = [];
      parentsList.value = [];
    }

    const parentsExtList = sortArrValues(
      Object.values(parents).map(item => ({ [ID_KEY]: item })),
      ID_KEY
    ).reduce((acc, item) => ({ ...acc, [item[ID_KEY]]: item[ID_KEY] }), {});
    const resListExtended = [
      ...resources,
      { [ID_KEY]: 0, [PARENT_KEY]: 0, [PAGETITLE_KEY]: 'Website' },
      /**/
      { [ID_KEY]: 8, [PARENT_KEY]: 2, [PAGETITLE_KEY]: 'ДЕТСКОЕ ОТДЕЛЕНИЕ', [PUBLISHED_KEY]: false },
      { [ID_KEY]: 168, [PARENT_KEY]: 18, [PAGETITLE_KEY]: 'Рефлексотерапия', [PUBLISHED_KEY]: false },
      { [ID_KEY]: 230, [PARENT_KEY]: 0, [PAGETITLE_KEY]: 'Хайлайты', [PUBLISHED_KEY]: false },
      { [ID_KEY]: 240, [PARENT_KEY]: 243, [PAGETITLE_KEY]: 'Тестирование и разработка', [PUBLISHED_KEY]: false },
    ];
    // 40 Отзывы
    // 230 Хайлайты
    // 240 Тестирование и разработка
    // 243 Технические страницы
    // 356 Примеры работ
    const resListSorted = sortArrValues(
      [...resources as TCustomValues[]].filter(
        item => ![40,230,240,243,356].includes(item[PARENT_KEY] as number)
      ),
      PARENT_KEY
    ).map(
      (item, index) => ({...item, [CLASS_KEY]: 'MODX\\Revolution\\modDocument', idx: index + 1 })
    ) as TItemData[];

    resList.value = resListSorted;

    for (const key in parentsExtList) {
      const data = resListExtended.reduce((acc, res) => {
        const resData = resListSorted.find(item => res[ID_KEY] === item[ID_KEY])

        return [...acc, resData ? {...res, ...resData} : res];
      }, [] as TItemData[]).find(
        res => res[ID_KEY] === parentsExtList[key]
      );
      //const children = resListSorted.filter(res => res[PARENT_KEY] === parentsExtList[key]);

      parentsList.value = data ? [...parentsList.value, { ...data } as TParentData] : parentsList.value;
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

      const { parents, resources, templates } = data;

      console.log(data);
      setTemplatesList(templates);
      setItemsList(parents, resources);
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
    resList,
    parentsList,
    templatesList,
    setLoading,
    fetchData,
    createData
  };
});

export { useResourcesStore };
