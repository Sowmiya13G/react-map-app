import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6Yq1JjOQQ-32jP7uRCxW3DnN7t3eMRz4",
  authDomain: "doodleblueclientmap.firebaseapp.com",
  projectId: "doodleblueclientmap",
  storageBucket: "doodleblueclientmap.appspot.com",
  messagingSenderId: "973239718663",
  appId: "1:973239718663:web:fcf0f565deaaab0bf96ba2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
