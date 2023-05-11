import firebaseApp from "../firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function addData(collection: string, id: string, data: any) {
    let result = null, error = null;
    try {
        result = await setDoc(doc(db, collection, id), 
        data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

  return { result, error };
}
