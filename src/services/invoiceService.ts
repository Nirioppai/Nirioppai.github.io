import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { auth, db } from '~/configs';
import { KEYS } from '~/constants';
import { InvoiceSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const invoiceInstanceRef = collection(db, KEYS.invoices);

const mapData = (data: any) =>
  // @ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const invoiceService2 = createGenericService<InvoiceSchema>(
  KEYS.invoices
);

export const invoiceService = {
  getStoreInvoices: async (storeId: string): Promise<any> => {
    const q = query(invoiceInstanceRef, where('storeId', '==', storeId));

    const data = await getDocs(q);
    const invoices = mapData(data);

    // Iterate over invoices and fetch corresponding productSales and serviceSales
    const salesPromises = invoices.map(async (invoice: any) => {
      // Fetch corresponding productSale
      const productSaleDoc = doc(db, 'productSales', invoice.productSaleId);
      const productSaleSnapshot = await getDoc(productSaleDoc);

      // If the productSale exists, add it to the invoice
      if (productSaleSnapshot.exists()) {
        invoice.productSale = productSaleSnapshot.data();
      }

      // Fetch corresponding serviceSale
      const serviceSaleDoc = doc(db, 'serviceSales', invoice.serviceSaleId);
      const serviceSaleSnapshot = await getDoc(serviceSaleDoc);

      // If the serviceSale exists, add it to the invoice
      if (serviceSaleSnapshot.exists()) {
        invoice.serviceSale = serviceSaleSnapshot.data();
      }

      return invoice;
    });

    const invoicesWithSales = await Promise.all(salesPromises);

    return invoicesWithSales;
  },

  getOwnerInvoices: async (): Promise<any> => {
    const userId = auth?.currentUser?.uid;

    const storesRef = collection(db, KEYS.storeInstances);
    const q = query(storesRef, where('ownerId', '==', userId));

    const querySnapshot = await getDocs(q);
    const stores = mapData(querySnapshot);

    const invoicesRef = collection(db, KEYS.invoices);

    // Create an array of promises
    const invoicesPromises = stores.map(async (store: any) => {
      const invoicesQuery = query(
        invoicesRef,
        where('storeId', '==', store._id)
      );
      const invoicesSnapshot = await getDocs(invoicesQuery);

      // For each invoice, get the productSale and serviceSale
      const invoicePromises = invoicesSnapshot.docs.map(
        async (invoiceDoc: any) => {
          const invoiceData = invoiceDoc.data();

          const productSaleDoc = doc(
            db,
            'productSales',
            invoiceData.productSaleId
          );
          const serviceSaleDoc = doc(
            db,
            'serviceSales',
            invoiceData.serviceSaleId
          );

          const [productSaleSnapshot, serviceSaleSnapshot] = await Promise.all([
            getDoc(productSaleDoc),
            getDoc(serviceSaleDoc),
          ]);

          // If the productSale and serviceSale exist, add them to the invoice
          if (productSaleSnapshot.exists()) {
            invoiceData.productSale = productSaleSnapshot.data();
          }
          if (serviceSaleSnapshot.exists()) {
            invoiceData.serviceSale = serviceSaleSnapshot.data();
          }

          return {
            id: invoiceDoc.id,
            ...invoiceData,
          };
        }
      );

      store.invoices = await Promise.all(invoicePromises);

      return store;
    });

    const storesWithInvoices = await Promise.all(invoicesPromises);

    return storesWithInvoices;
  },
  getServiceInvoices: async (storeId: string): Promise<any> => {
    const q = query(
      invoiceInstanceRef,
      where('storeId', '==', storeId),
      where('serviceSaleId', '!=', 'no-sale')
    );

    const data = await getDocs(q);
    return mapData(data);
  },

  getProductInvoices: async (storeId: string): Promise<any> => {
    const q = query(
      invoiceInstanceRef,
      where('storeId', '==', storeId),
      where('productSaleId', '!=', 'no-sale')
    );

    const data = await getDocs(q);
    return mapData(data);
  },

  getInvoiceCustomers: async (storeId: string): Promise<any> => {
    const q = query(invoiceInstanceRef, where('storeId', '==', storeId));

    const data = await getDocs(q);

    return mapData(data);
  },

  getInvoiceAddress: async (storeId: string): Promise<any> => {
    const q = query(invoiceInstanceRef, where('storeId', '==', storeId));

    const data = await getDocs(q);
    const invoiceData = mapData(data);

    // extract and return only the customer names
    const customerAddresses = invoiceData.map(
      (invoice: any) => invoice.customerAddress
    );
    return customerAddresses;
  },
  getInvoiceContact: async (storeId: string): Promise<any> => {
    const q = query(invoiceInstanceRef, where('storeId', '==', storeId));

    const data = await getDocs(q);
    const invoiceData = mapData(data);

    // extract and return only the customer names
    const customerContacts = invoiceData.map(
      (invoice: any) => invoice.customerContact
    );
    return customerContacts;
  },
  postOne: async (invoice: any): Promise<any> => {
    const { orderDetails, ...invoiceData } = invoice;

    // Calculate product quantities in the invoice
    const invoiceProductQuantities = orderDetails.products.reduce(
      (acc: any, product: any) => {
        acc[product._id] = (acc[product._id] || 0) + 1;
        return acc;
      },
      {}
    );

    // Check if any product in the invoice exceeds available stock
    for (const productId in invoiceProductQuantities) {
      const productRef = doc(db, KEYS.products, productId);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        throw new Error(`Product with ID ${productId} does not exist.`);
      }

      const productData = productSnapshot.data();
      if (productData.stock < invoiceProductQuantities[productId]) {
        throw new Error(
          `Insufficient stock for the product ${productData.name}.`
        );
      }
    }

    // Initialize invoiceData's iterationCount to 1
    invoiceData.iterationCount = 1;

    // Create serviceSale and productSale documents
    const serviceSaleData = {
      storeId: invoiceData.storeId,
      services: orderDetails.services,
      subtotal: orderDetails.services.reduce(
        (total: any, service: any) => total + service.price,
        0
      ),
      status: 'Successful',
      iterationCount: 1,
    };

    const productSaleData = {
      storeId: invoiceData.storeId,
      products: orderDetails.products,
      subtotal: orderDetails.products.reduce(
        (total: any, product: any) => total + product.price,
        0
      ),
      status: 'Successful',
      iterationCount: 1,
    };

    // update so that product quantity would get subtracted here regarding how many products were inside the orderDetails

    let serviceSaleRef, productSaleRef;

    if (serviceSaleData.services.length > 0) {
      serviceSaleRef = await addDoc(
        collection(db, KEYS.serviceSales),
        serviceSaleData
      );
      // Include the ID in the invoiceData
      invoiceData.serviceSaleId = serviceSaleRef.id;
    }

    if (productSaleData.products.length > 0) {
      productSaleRef = await addDoc(
        collection(db, KEYS.productSales),
        productSaleData
      );

      // Update the stock of each product
      // Group the products by their _id and calculate the quantities sold
      const quantities = productSaleData.products.reduce(
        (acc: any, product: any) => {
          acc[product._id] = {
            quantity: (acc[product._id]?.quantity || 0) + 1,
            name: product.name,
          };
          return acc;
        },
        {}
      );

      // Loop through the quantities object
      for (const productId in quantities) {
        const productRef = doc(db, KEYS.products, productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();

          if (productData.stock >= quantities[productId].quantity) {
            await updateDoc(productRef, {
              stock: productData.stock - quantities[productId].quantity,
            });
          } else {
            throw new Error(
              'Not enough stock for product: ' + quantities[productId].name
            );
          }
        } else {
          throw new Error(
            'Product does not exist: ' + quantities[productId].name
          );
        }
      }

      // Include the ID in the invoiceData
      invoiceData.productSaleId = productSaleRef.id;
    }

    const tempTimeStamp = Timestamp.now();

    const date = new Date(tempTimeStamp.seconds * 1000); // JavaScript uses milliseconds

    invoiceData.timestamp = date.toISOString();

    const invoiceRef = await addDoc(collection(db, KEYS.invoices), invoiceData);

    // Update serviceSale and productSale documents with the invoiceId
    if (serviceSaleRef?.id) {
      await setDoc(
        doc(db, KEYS.serviceSales, serviceSaleRef?.id || 'failed'),
        {
          invoiceId: invoiceRef.id,
        },
        { merge: true }
      );
    }

    if (productSaleRef?.id) {
      await setDoc(
        doc(db, KEYS.productSales, productSaleRef?.id || 'failed'),
        {
          invoiceId: invoiceRef.id,
        },
        { merge: true }
      );
    }

    return {
      _id: invoiceRef.id,
      ...invoiceData,
      orderDetails,
    };
  },

  deleteOne: async (invoiceId: string): Promise<any> => {
    const data = await deleteDoc(doc(db, KEYS.invoices, invoiceId));

    return data;
  },
};
