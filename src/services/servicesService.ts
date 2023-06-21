import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  // orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { ServiceSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const serviceInstanceRef = collection(db, KEYS.services);
const serviceInstanceKey = KEYS.services;
const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const serviceService2 = createGenericService<ServiceSchema>(
  KEYS.services
);

export const servicesService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getServices: async (ownerId: string): Promise<any> => {
    const q = query(
      serviceInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getServicesInStore: async (storeId: string): Promise<any> => {
    const q = query(
      serviceInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  postOne: async (service: ServiceSchema): Promise<any> => {
    const data = await addDoc(serviceInstanceRef, service);

    return {
      // @ts-ignore
      _id: data.id,
      ...service,
    };
    // check if user has service instance credits available
    // check if service name is already taken
    // if not, create empty services object too
    // return stor service
    // initializee
  },
  postOneInsideStore: async (service: ServiceSchema): Promise<any> => {
    const data = await addDoc(serviceInstanceRef, service);
    const storeId = service.storeId;
    // @ts-ignore
    const storeRef = doc(db, storeInstanceKey, storeId);
    const serviceRef = doc(db, serviceInstanceKey, data.id);
    // Update service stores array and insert ID of newly created service
    await updateDoc(storeRef, { services: arrayUnion(data.id) });
    await updateDoc(serviceRef, { storesAssigned: arrayUnion(storeId) });
    return {
      // @ts-ignore
      _id: data.id,
      ...service,
    };
  },
  postOneExistingServiceInsideStore: async (
    service: ServiceSchema
  ): Promise<any> => {
    const storeId = service.storeId;

    const docRef = doc(db, serviceInstanceKey, service.name);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    // @ts-ignore
    const storeRef = doc(db, storeInstanceKey, storeId);
    const serviceRef = doc(db, serviceInstanceKey, service.name);

    await updateDoc(storeRef, { services: arrayUnion(service.name) });
    await updateDoc(serviceRef, { storesAssigned: arrayUnion(storeId) });

    return {
      // @ts-ignore
      _id: service.name,
      // @ts-ignore
      category: docData.category,
      // @ts-ignore
      price: docData.price,
      // @ts-ignore
      name: docData.name,
      // @ts-ignore
      description: docData.description,
      // @ts-ignore
      ownerId: docData.ownerId,
    };
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.services, storeId));

    // throw new Error('WEW');

    return data;
  },
};
