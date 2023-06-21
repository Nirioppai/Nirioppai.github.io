export const createHashMap = <T, NT extends Record<string, unknown>>(
  array: T[],
  key: (keyof T & string) | ((item: T) => string),
  additionalPropertiesSetter?: (item: T, index: number) => NT
): Map<string, T & NT> => {
  const map = new Map();
  array.forEach((item, index) => {
    map.set(
      typeof key === 'string' ? item[key] : key(item),
      additionalPropertiesSetter
        ? { ...item, ...additionalPropertiesSetter(item, index) }
        : item
    );
  });
  return map;
};

export const createGroupedHashMap = <T, NT extends Record<string, unknown>>(
  array: T[],
  key: (keyof T & string) | ((item: T) => string),
  additionalPropertiesSetter?: (item: T, index: number) => NT
): Map<string, T[] & NT[]> => {
  const map = new Map();
  array.forEach((item, index) => {
    const keyValue = typeof key === 'string' ? item[key] : key(item);
    const existingValue = map.get(keyValue);
    if (existingValue) {
      map.set(keyValue, [
        ...existingValue,
        additionalPropertiesSetter
          ? { ...item, ...additionalPropertiesSetter(item, index) }
          : item,
      ]);
    } else {
      map.set(keyValue, [
        additionalPropertiesSetter
          ? { ...item, ...additionalPropertiesSetter(item, index) }
          : item,
      ]);
    }
  });
  return map;
};
