import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  onSnapshot,
  doc,
  getDoc
} from "firebase/firestore";

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl-CvVar-4A5p62B9jaLwYhcj1PE-nsXo",
  authDomain: "proyecto-adisa-53be8.firebaseapp.com",
  projectId: "proyecto-adisa-53be8",
  storageBucket: "proyecto-adisa-53be8.appspot.com",
  messagingSenderId: "416071443391",
  appId: "1:416071443391:web:96f938d24fbdc5f131770a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
const allTweets = [];

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const saveTweet = async (objectTweet) => {
  await addDoc(collection(db, "tweets"), objectTweet );
}

const getTweets = async () => {
  const q = query(collection(db, "tweets"))
  const changes = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach( (doc) => {
      allTweets.push({...doc.data(), id: doc.id})
    })
  })
}

const onGetTweets = (callback) => {
  return onSnapshot(collection(db, 'tweets'), callback)
}

async function uploadFile(file) {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordReset,
  logout,
  saveTweet,
  getTweets,
  onGetTweets,
  addDoc,
  allTweets,
  onSnapshot,
  storage,
  uploadFile
};