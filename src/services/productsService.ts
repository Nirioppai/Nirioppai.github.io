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
import { ProductSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const productInstanceRef = collection(db, KEYS.products);
const productInstanceKey = KEYS.products;
const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const productsService2 = createGenericService<ProductSchema>(
  KEYS.products
);

export const productsService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER
  getProducts: async (ownerId: string): Promise<any> => {
    const q = query(productInstanceRef, where('ownerId', '==', ownerId));

    const data = await getDocs(q);

    const productData = mapData(data);

    // Create a category map
    const categoryMap: { [key: string]: any } = {};
    const categoryInstanceRef = collection(db, KEYS.productCategories);
    const categoryData = await getDocs(categoryInstanceRef);

    categoryData.docs.forEach((doc) => {
      const category = { ...doc.data(), _id: doc.id };
      categoryMap[category._id] = category;
    });

    // Map product data
    productData.forEach((product: any) => {
      // Replace category id with category name
      const category = categoryMap[product.category];
      if (category) {
        product.category = category.name;
      }
    });

    return productData;
  },
  getProductsInStore: async (storeId: string): Promise<any> => {
    const q = query(
      productInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
    );

    const data = await getDocs(q);
    const productData = mapData(data);

    // Create a category map
    const categoryMap: { [key: string]: any } = {};
    const categoryInstanceRef = collection(db, KEYS.productCategories);
    const categoryData = await getDocs(categoryInstanceRef);

    categoryData.docs.forEach((doc) => {
      const category = { ...doc.data(), _id: doc.id };
      categoryMap[category._id] = category;
    });

    // Map product data
    productData.forEach((product: any) => {
      // Replace category id with category name
      const category = categoryMap[product.category];
      if (category) {
        product.category = category.name;
      }
    });

    return productData;
  },
  getCashierProductsInStore: async (storeId: string): Promise<any> => {
    const q = query(
      productInstanceRef,
      where('storesAssigned', 'array-contains', storeId),
      where('availability', '==', 'Available')
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    const productData = mapData(data);

    // Create a category map
    const categoryMap: { [key: string]: any } = {};
    const categoryInstanceRef = collection(db, KEYS.productCategories);
    const categoryData = await getDocs(categoryInstanceRef);

    categoryData.docs.forEach((doc) => {
      const category = { ...doc.data(), _id: doc.id };
      categoryMap[category._id] = category;
    });

    // Map product data
    productData.forEach((product: any) => {
      // Replace category id with category name
      const category = categoryMap[product.category];
      if (category) {
        product.category = category.name;
      }
    });

    return productData;
  },

  postOne: async (product: ProductSchema): Promise<any> => {
    const data = await addDoc(productInstanceRef, product);

    return {
      // @ts-ignore
      _id: data.id,
      ...product,
    };
  },
  postOneInsideStore: async (product: ProductSchema): Promise<any> => {
    const data = await addDoc(productInstanceRef, product);
    const storeId = product.storeId;

    // @ts-ignore

    const storeRef = doc(db, storeInstanceKey, storeId);
    const productRef = doc(db, productInstanceKey, data.id);
    // Update product stores array and insert ID of newly created product
    await updateDoc(storeRef, { products: arrayUnion(data.id) });
    await updateDoc(productRef, { storesAssigned: arrayUnion(storeId) });
    return {
      // @ts-ignore
      _id: data.id,
      ...product,
    };
  },
  // gawa ng bagong post para sa adding from existing
  postOneExistingProductInsideStore: async (
    product: ProductSchema
  ): Promise<any> => {
    const storeId = product.storeId;

    const docRef = doc(db, productInstanceKey, product.name);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    // @ts-ignore
    const storeRef = doc(db, storeInstanceKey, storeId);
    const productRef = doc(db, productInstanceKey, product.name);

    await updateDoc(storeRef, { products: arrayUnion(product.name) });
    await updateDoc(productRef, { storesAssigned: arrayUnion(storeId) });

    return {
      // @ts-ignore
      _id: product.name,
      // @ts-ignore
      category: docData.category,
      // @ts-ignore
      price: docData.price,
      // @ts-ignore
      name: docData.name,
      // @ts-ignore
      stock: docData.stock,
      // @ts-ignore
      description: docData.description,
      // @ts-ignore
      ownerId: docData.ownerId,
    };
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.products, storeId));

    return data;
  },
};
