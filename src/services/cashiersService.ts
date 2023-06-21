import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
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
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { auth, auth2, db2 } from '~/configs';
import { KEYS } from '~/constants';
import { CashierSchema } from '~/schemas';
import { createGenericService } from '~/utils';

const cashierInstanceRef = collection(db2, KEYS.cashiers);
const cashierInstanceKey = KEYS.cashiers;

const storeInstanceKey = KEYS.storeInstances;

const mapData = (data: any) =>
  //@ts-ignore
  data.docs.map((doc) => ({
    _id: doc.id,
    ...doc.data(),
  }));

export const cashiersService2 = createGenericService<CashierSchema>(
  KEYS.cashiers
);

// Utility functions
function removeSpaces(sentence: string) {
  return sentence.replace(/\s/g, '');
}

function generateFourRandomNumbers() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(
    ''
  );
}

// User creation logic
const createUser = async (
  email: string,
  name: string,
  password: string,
  userType: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth2,
      email,
      password
    );

    if (user) {
      const docRef = doc(db2, KEYS.users, user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: name,
          email: user.email,
          userType: userType,
          timestamp: serverTimestamp(),
        });
      }

      return user;
    }

    throw new Error('User creation failed');
  } catch (err) {
    console.error(err);
    throw new Error(err.message || 'Unknown error during user creation');
  }
};

// Cashier creation logic
const createCashier = async (
  storeId: string,
  cashierName: string,
  cashierPassword: string,
  randomNumber: string
) => {
  try {
    const docRef = doc(db2, storeInstanceKey, storeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    // @ts-ignore
    const email = `${removeSpaces(docData.name)}${removeSpaces(
      cashierName
    )}${randomNumber}@gmail.com`;

    const user = await createUser(
      email,
      cashierName,
      cashierPassword,
      'cashier'
    );

    const newUser = {
      id: user.uid,
      ...user,
    };
    return newUser;
  } catch (e) {
    console.error(e);
    throw new Error(e.message || 'Unknown error during cashier creation');
  }
};

export const cashiersService = {
  // GET STORES WHERE USERREF = CURRENTLY LOGGED IN USER

  getCashiers: async (ownerId: string): Promise<any> => {
    const q = query(
      cashierInstanceRef,
      where('ownerId', '==', ownerId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getLoggedInCashier: async (): Promise<any> => {
    const cashierId = auth.currentUser?.uid || '';
    const q = query(
      cashierInstanceRef,
      where('cashierId', '==', cashierId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  getCashiersInStore: async (storeId: string): Promise<any> => {
    const q = query(
      cashierInstanceRef,
      where('storesAssigned', 'array-contains', storeId)
      // orderBy('timestamp', 'desc')
    );

    const data = await getDocs(q);
    return mapData(data);
  },
  postOne: async (cashier: CashierSchema): Promise<any> => {
    const storeId = cashier.storeId;
    const randomNumber = generateFourRandomNumbers();

    const newCashierUser = await createCashier(
      // @ts-ignore
      storeId,
      cashier.name,
      cashier.password,
      randomNumber
    );

    // @ts-ignore
    const docRef = doc(db2, storeInstanceKey, cashier.storeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || '';

    const newCashier = {
      name: cashier.name,
      ownerId: cashier.ownerId,
      // @ts-ignore
      email: `${docData.name.split(' ').join('')}${removeSpaces(
        cashier.name
      )}${randomNumber}@gmail.com`,
      password: cashier.password,
      storeId: cashier.storeId,
    };

    const data = await addDoc(cashierInstanceRef, newCashier);

    // @ts-ignore
    const storeRef = doc(db2, storeInstanceKey, storeId);
    const cashierRef = doc(db2, cashierInstanceKey, data.id);

    // @ts-ignore
    await updateDoc(storeRef, { cashiers: arrayUnion(newCashierUser.id) });
    await updateDoc(cashierRef, {
      // @ts-ignore
      cashierId: newCashierUser.uid,
      storesAssigned: arrayUnion(storeId),
    });

    await signOut(auth2);

    return {
      // @ts-ignore
      _id: data.id,
      ...newCashier,
    };
    // check if user has cashier instance credits available
    // check if cashier name is already taken
    // if not, create empty cashiers object too
    // return stor cashier
    // initializee
  },
  postOneCashierInsideStore: async (cashier: CashierSchema): Promise<any> => {
    const storeId = cashier.storeId;

    // @ts-ignore
    createCashier(storeId, cashier.name, cashier.password);

    const data = await addDoc(cashierInstanceRef, cashier);

    // @ts-ignore
    const storeRef = doc(db2, storeInstanceKey, storeId);
    const cashierRef = doc(db2, cashierInstanceKey, data.id);
    // Update cashier stores array and insert ID of newly created cashier
    await updateDoc(storeRef, { cashiers: arrayUnion(data.id) });
    await updateDoc(cashierRef, {
      storesAssigned: arrayUnion(storeId),
    });

    await signOut(auth2);

    return {
      // @ts-ignore
      _id: data.id,
      ...cashier,
    };
  },
  archiveOne: async (storeId: string): Promise<any> => {
    const data = await deleteDoc(doc(db2, KEYS.cashiers, storeId));

    // throw new Error('WEW');

    return data;
  },
};
