import firebaseApp from '@/firebase/firebaseConfig';
import { signOut, getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default async function signOutFirebase() {
  let result = null, error = null;
  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return {result , error}; 
}
