import type { TCustomData } from './types';

type TCustomValues = TCustomData<string | number>;

const sortArrValues = (arr: TCustomValues[], key: string): TCustomValues[] => {
  const handleStrValue = (value: string): string => value !== null ? value.toString().toLowerCase() : '';

  const handleNumValue = (value: number): number => value !== null ? Number(value) : 0;

  const handleValue = (value: string | number): string | number => typeof value === 'string'
    ? handleStrValue(value as string)
    : handleNumValue(value as number);

  return arr.sort((a, b) => {
    const valueA = handleValue(a[key]);
    const valueB = handleValue(b[key]);

    if(valueA < valueB) {
      return -1;
    }
    if(valueA > valueB) {
      return 1;
    }
    return 0;
  });
};

export {
  sortArrValues
}
