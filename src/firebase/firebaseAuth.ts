// import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword   } from "firebase/auth";
import {
    getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, 
    signOut,sendPasswordResetEmail,deleteUser} from "firebase/auth";
 import { app } from "./firebaseConfig";
 import { getStorage, ref, uploadBytes,getDownloadURL  } from "firebase/storage";
import { saveUser } from "./firebaseFireStore";

 const storage = getStorage(app);
 
 export const auth = getAuth(app);

 export  function signupWithEmailPassword(email:string,password:string){
 
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
       
    const {email,uid,emailVerified} = userCredential.user

saveUser({
  email: email as string, uid,emailVerified,
  firstName: "",
  lastName: ""
})

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorMessage);
    
    // ..
  })
 }
 
 
 
 export function loginWithEmailPassword(email:string,password:string){

     signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;

     console.log('user is login==>',user);
     
     
     // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     console.error(errorMessage);
     
   });
 }
 
 
 
 

 export function forgetPassword(userEmail:string){
 

sendPasswordResetEmail(auth,userEmail )
  .then(() => {
    // Password reset email sent!
    // ..
    console.log(userEmail);
    console.log('email forget send');
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}















// import { app } from '@/firebase/firbaseconfig';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { saveUser } from "./firebaseFireStore";
// import { app } from "./firebaseConfig";
// // import { saveUser } from './firebasefirestore';

// export const auth = getAuth(app);

// export function signupWithEmailPassword(email: string, password: string) {
//     // console.log(email, password, rollNum, studentName, 'inside func')

//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed up 
//             const { email, uid } = userCredential.user;
//             console.log(email, uid,'user created successfully.');

//             saveUser({ email: email as string, uid });

//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error(errorMessage);
//             // ..
//         });
// }


// export function loginWithEmailPassword(email: string, password: string) {
//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const { email, uid } = userCredential.user;

//             console.log(email, uid, 'user LOGGED IN successfully.', userCredential);

//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.error(errorMessage);

//         });
// }