import firebaseApp from '../../firebase/firebaseConfig';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default async function resetPassword(email: string) {
  let result = null, error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
  } catch (e) {
    error = e;
  }

  return {result , error}; 
}