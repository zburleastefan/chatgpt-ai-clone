import firebaseApp from '@/firebase/firebaseConfig';
import { GoogleAuthProvider, getAuth, sendEmailVerification, signInWithRedirect } from 'firebase/auth';

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export default async function singInWithGoogle() {
  let result = null, error = null;
  try {
    if (auth.currentUser?.emailVerified == false) {
      error = 'Please check your email and activate your account!';
      sendEmailVerification(auth?.currentUser!);
    } else {
      result = await signInWithRedirect(auth, provider);
    }
  } catch (e) {
    error = e;
  }

  return {result , error}; 
}
