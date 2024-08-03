import { db } from "@/firebase";
import {
  collection,
  getCountFromServer,
  orderBy,
  query,
} from "firebase/firestore";

async function getDocumentCount(docName) {
  try {
    const q = query(collection(db, docName));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data()) {
        return snapshot.data().count;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default getDocumentCount;
