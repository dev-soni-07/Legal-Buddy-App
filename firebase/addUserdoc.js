import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function addUserData(data, userId) {
  try {
    const docRef = await setDoc(doc(db, `users`, userId), data);
    return docRef;
  } catch (error) {
    console.log(error);
  }
}