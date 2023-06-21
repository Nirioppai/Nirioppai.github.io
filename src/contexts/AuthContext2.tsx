import { createContext, useContext, useEffect, useState } from 'react';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth2, db2 } from '~/configs';
import { KEYS } from '~/constants';

// @ts-ignore
const UserContext2 = createContext();

// @ts-ignore
export const AuthContextProvider2 = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (
    email: string,
    name: string,
    password: string,
    userType: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth2,
        email,
        password
      );
      const user = result.user;

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

      const userDetails = {
        id: user,
      };
      return {
        ...user,
        userDetails,
      };
    } catch (err: any) {
      throw new Error(err?.message || err);
    }
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth2, email, password);
  };

  const googleSignIn = async (userType: string) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth2, provider);
      const user = result.user;

      const docRef = doc(db2, KEYS.users, user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userType: userType,
          timestamp: serverTimestamp(),
        });
      }

      const userDetails = {
        id: user,
      };
      return {
        ...user,
        userDetails,
      };
    } catch (err: any) {
      throw new Error(err?.message || err);
    }
  };

  const logout2 = () => {
    return signOut(auth2);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
      // @ts-ignore
      const deleteRef = doc(db2, 'users', currentUser?.uid);

      getDoc(deleteRef).then((snapshot) => {
        const snapshotData = snapshot.data();
        const snapshotId = snapshot.id;

        const currentUserCopy = { ...currentUser, snapshotData, snapshotId };

        setUser(currentUserCopy);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext2.Provider
      value={{ user, createUser, logout2, signIn, googleSignIn }}
    >
      {children}
    </UserContext2.Provider>
  );
};

export const UserAuth2 = () => {
  return useContext(UserContext2);
};
