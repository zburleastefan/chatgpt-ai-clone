import firebaseApp from '@/src/firebase/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default async function signUp(email: string, password: string) {
  let result = null, error = null, message = '';
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      if(res.user.email != null || res.user.email != '') {
        sendEmailVerification(auth?.currentUser!);
        message = 'Succesfully signed up with ' + email + '!\nPlease check your email to validate your account.';
      }
    });
  } catch (e) {
    error = e;
  }

  return {result , error, message}; 
}
