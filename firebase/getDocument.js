import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

async function getDocument(docName,docId) {
    try {
        const snapshot = await getDoc(doc(db, docName, docId))
        if (snapshot.exists()){
            return snapshot.data();
        } else return "no data"
      } catch (error) {
        console.error("Error retrieving Firestore documents:", error);
        return [];
      }
}

export default getDocument