import { storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef);
};

export default deleteFile;
