import firebaseApp from '@/src/firebase/firebaseConfig';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default async function signIn(email: string, password: string) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser?.emailVerified == false) {
      error = 'Please check your email and activate your account!';
      sendEmailVerification(auth?.currentUser!);
    }
  } catch (e) {
    error = e;
  }

  return {result , error}; 
}
