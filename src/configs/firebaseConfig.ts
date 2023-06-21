// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBEeAfnFuXVaQWB4IMm9_3bRnxgI3mSzOQ',
  authDomain: 'realtor-clone-react-86110.firebaseapp.com',
  projectId: 'realtor-clone-react-86110',
  storageBucket: 'realtor-clone-react-86110.appspot.com',
  messagingSenderId: '544108992775',
  appId: '1:544108992775:web:464dfe9eb8be3ffca84da2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
