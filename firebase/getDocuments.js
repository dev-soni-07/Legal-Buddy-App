import { db } from "@/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

async function getDocuments(docName, userId=null) {
    try {
        const snapshot = userId ? await getDocs(query(collection(db, docName), where("userId", "==", userId ))) : await getDocs(query(collection(db, docName)))
        const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return documents;
      } catch (error) {
        console.error("Error retrieving Firestore documents:", error);
        return [];
      }
}

export default getDocuments