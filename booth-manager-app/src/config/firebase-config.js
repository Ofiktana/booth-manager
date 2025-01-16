// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg_S0_0eW_PGVzc6DyCoJ5uwqDm7BhclM",
  authDomain: "booth-manager-1baa6.firebaseapp.com",
  projectId: "booth-manager-1baa6",
  storageBucket: "booth-manager-1baa6.firebasestorage.app",
  messagingSenderId: "581836977642",
  appId: "1:581836977642:web:5b719d25ba089b1d6f2e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/************************************************************************************/
//SETTING UP AUTHENTICATION
/************************************************************************************/

export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Google Sign-in implementation

export async function signInWithGoogle(){
  try{
    const result = (await signInWithPopup(auth, provider)).user
    return result
  }
  catch(err){
    console.log(err)
  }

}

  //Email and password sign-in implementation

export async function registerNewUserWithEmail(email, password){
  try{
    const user = (await createUserWithEmailAndPassword(auth, email, password)).user
    return user

  }catch(err){
    console.log(err)
  }
}

export async function signInUserWithEmail(email, password){

  try{
    const user = (await signInWithEmailAndPassword(auth, email, password)).user
    return user

  }catch(err){
    console.log(err)
  }
}



// Sign-out Implementation

export async function authSignOut(){
  await signOut(auth)
  localStorage.removeItem('auth-booth-manager')
}

// Updating user-profile

export async function authUpdateProfile(firstName, lastName){
  const newDisplayName = `${firstName} ${lastName}`
  try {
    await updateProfile(auth.currentUser, {displayName: newDisplayName})

  } catch (error) {
    console.log(error)
  }
}
