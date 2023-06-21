import { doc, updateDoc } from 'firebase/firestore';

import { db } from '~/configs';
import { BaseSchema } from '~/schemas';

//@ts-ignore
export const createGenericService = <TBase>(documentReference: string) => {
  type T = BaseSchema & TBase;

  interface UpdateParams {
    id: string;
    item: TBase;
  }

  return {
    putOne: async ({ id, item }: UpdateParams): Promise<T> => {
      const docRef = doc(db, documentReference, id);
      // @ts-ignore
      await updateDoc(docRef, item);

      return {
        // @ts-ignore
        _id: id,
        ...item,
      };
    },
  };
};
