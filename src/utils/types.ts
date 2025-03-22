export type TCustomData<T> = Record<string, T>

export type TItemData = TCustomData<string | number | boolean>;

export type TItemDataKeys = keyof TItemData;

export type TParentData = TItemData | { children: TItemData[] };
