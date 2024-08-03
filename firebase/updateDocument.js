import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

async function updateDocument(docName, data, docId) {
  try {
    await updateDoc(doc(db, docName, docId), data);
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
  return "Successfully updated"
}

export default updateDocument;