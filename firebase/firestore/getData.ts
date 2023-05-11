import firebaseApp from "../firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function getData(collection: string, id: string) {
    let result = null, error = null;
    let docRef = doc(db, collection, id);
    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

  return { result, error };
}
