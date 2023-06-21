import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  // orderBy,
  query,
  // updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { StoreSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const storeInstanceRef = collection(db, KEYS.storeInstances);
const storeInstanceKey = KEYS.storeInstances;
const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const storesService2 = createGenericService<StoreSchema>(
  KEYS.storeInstances
);

export const storesService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getStores: async (ownerId: string): Promise<any> => {
    const q = query(
      storeInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getEntitiesInsideStore: async (storeId: string): Promise<any> => {
    const docRef = doc(db, storeInstanceKey, storeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    return docData;
  },
  postOne: async (store: StoreSchema): Promise<any> => {
    const data = await addDoc(storeInstanceRef, store);

    return {
      // @ts-ignore
      _id: data.id,
      ...store,
    };
    // check if user has store instance credits available
    // check if store name is already taken
    // if not, create empty products object too
    // return stor store
    // initializee
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.storeInstances, storeId));

    // throw new Error('WEW');

    return data;
  },
};
