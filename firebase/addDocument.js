import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

async function addDocument(docName, data) {
  try {
    await addDoc(collection(db, docName), data);
  } catch (error) {
    console.log(error)
    throw Error(error)
  }
  return "Successfully created"
}

export default addDocument;
