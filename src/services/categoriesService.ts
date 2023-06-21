import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  // orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '~/configs';
import { KEYS } from '~/constants';
import { ProductCategorySchema, ServiceCategorySchema } from '~/schemas';
import { createGenericService } from '~/utils';

const productCategoryInstanceRef = collection(db, KEYS.productCategories);
const serviceCategoryInstanceRef = collection(db, KEYS.serviceCategories);
const productCategoryInstanceKey = KEYS.productCategories;
// const serviceCategoryInstanceKey = KEYS.serviceCategories;

const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const categoriesService2 = createGenericService<ProductCategorySchema>(
  KEYS.productCategories
);

export const categoriesService3 = createGenericService<ServiceCategorySchema>(
  KEYS.serviceCategories
);

export const categoriesService = {
  getProductCategories: async (ownerId: string): Promise<any> => {
    const q = query(
      productCategoryInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getProductCategoriesInStore: async (storeId: string): Promise<any> => {
    const q = query(
      productCategoryInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getServiceCategories: async (ownerId: string): Promise<any> => {
    const q = query(
      serviceCategoryInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getServiceCategoriesInStore: async (storeId: string): Promise<any> => {
    const q = query(
      serviceCategoryInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  postOneProductCategory: async (
    category: ProductCategorySchema
  ): Promise<any> => {
    const data = await addDoc(productCategoryInstanceRef, category);

    return {
      // @ts-ignore
      _id: data.id,
      ...category,
    };
  },
  postOneProductCategoryInsideStore: async (
    productCategory: ProductCategorySchema
  ): Promise<any> => {
    const data = await addDoc(productCategoryInstanceRef, productCategory);
    const storeId = productCategory.storeId;
    // @ts-ignore
    const storeRef = doc(db, storeInstanceKey, storeId);
    const productCategoryRef = doc(db, productCategoryInstanceKey, data.id);
    // Update productCategory stores array and insert ID of newly created productCategory
    await updateDoc(storeRef, { productCategories: arrayUnion(data.id) });
    await updateDoc(productCategoryRef, {
      storesAssigned: arrayUnion(storeId),
    });
    return {
      // @ts-ignore
      _id: data.id,
      ...productCategory,
    };
  },
  postOneServiceCategory: async (
    category: ServiceCategorySchema
  ): Promise<any> => {
    const data = await addDoc(serviceCategoryInstanceRef, category);

    return {
      // @ts-ignore
      _id: data.id,
      ...category,
    };
  },

  archiveOneProductCategory: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.productCategories, storeId));

    return data;
  },
  archiveOneServiceCategory: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.serviceCategories, storeId));

    return data;
  },
};
