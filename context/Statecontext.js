import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [alert, setAlert] = useState({
    isShow: false,
    type: "",
    message: "",
    timeout: 3000,
  });
  const [deleteDocument, setDeleteDocument] = useState({
    show: false,
    docId: "",
    docName: ""
  })
  const [adminMenu, setAdminMenu] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUserProfileData = async () => {
      try {
        const getData = await getDoc(doc(db, "users", currentUser.uid));
        setUserProfileData(getData.exists() ? getData.data() : undefined);
      } catch (error) {
        console.log(error);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || undefined);
      if (currentUser) {
        getUserProfileData();
      }
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser]);
  return (
    <Context.Provider
      value={{
        adminMenu,
        setAdminMenu,
        alert,
        setAlert,
        userLoading,
        userProfileData,
        currentUser,
        loading,
        setLoading,
        setDeleteDocument,
        deleteDocument
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
