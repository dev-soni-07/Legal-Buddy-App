// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";
// // import { getStorage } from "firebase/storage";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey:  process.env.NEXT_PUBLIC_API_KEY,
// //   authDomain: "hackathon-project-e3d74.firebaseapp.com",
// //   projectId: "hackathon-project-e3d74",
// //   storageBucket: "hackathon-project-e3d74.appspot.com",
// //   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
// //   appId: process.env.NEXT_PUBLIC_APP_ID,
// //   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // if (app.name && typeof window !== "undefined") {
// //   const analytics = getAnalytics(app);
// // }
// // export const db = getFirestore(app);
// // export const auth = getAuth(app);
// // export const storage = getStorage(app);

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey:  process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: "legal-buddy-app.firebaseapp.com",
//   projectId: "legal-buddy-app",
//   storageBucket: "legal-buddy-app.appspot.com",
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// if (app.name && typeof window !== "undefined") {
//   const analytics = getAnalytics(app);
// }
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage = getStorage(app);


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
export const db = getFirestore(app);
console.log("db: ", db);
export const auth = getAuth(app);
console.log("auth: ", auth);
export const storage = getStorage(app);
console.log("storage: ", storage);