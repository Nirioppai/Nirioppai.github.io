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
import { setRecoil } from 'recoil-nexus';

import { auth, cashierSelectedStore, db, selectedStore } from '~/configs';
import { KEYS } from '~/constants';

// @ts-ignore
const UserContext = createContext();

// @ts-ignore
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (
    email: string,
    name: string,
    password: string,
    userType: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      const docRef = doc(db, KEYS.users, user.uid);
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

  const signIn = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      let customMessage = '';
      switch (err.code) {
        case 'auth/invalid-email':
          customMessage = 'Invalid email format.';
          break;
        case 'auth/user-disabled':
          customMessage = 'This user has been disabled.';
          break;
        case 'auth/user-not-found':
          customMessage = 'Incorrect credentials.';
          break;
        case 'auth/wrong-password':
          customMessage = 'Incorrect credentials.';
          break;
        default:
          customMessage = 'Login failed. Please try again.';
          break;
      }
      throw new Error(customMessage);
    }
  };

  const googleSignIn = async (userType: string) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, KEYS.users, user.uid);
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

  const logout = () => {
    setRecoil(selectedStore, '');
    setRecoil(cashierSelectedStore, '');

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // @ts-ignore
      const deleteRef = doc(db, 'users', currentUser?.uid);

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
    <UserContext.Provider
      value={{ user, createUser, logout, signIn, googleSignIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
