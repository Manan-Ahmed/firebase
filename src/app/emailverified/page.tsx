"use client"
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { UseAuthContext } from "@/context/authContext"
import { auth } from "@/firebase/firebaseAuth";
import { app } from "@/firebase/firebaseConfig";
import { fetchUsers } from "@/firebase/firebaseFireStore";
import { collection, query, where, onSnapshot, getFirestore, Unsubscribe } from "firebase/firestore";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Email(){
const route = useRouter()
  const {user} = UseAuthContext()!
  const db = getFirestore(app);
const [allUsers,setAllUsers] = useState<any>()

// useEffect(()=>{
//   fetchAllUsers()
// },[])

// const fetchAllUsers = async()=>{
//   let fetchedUser   = await  fetchUsers()
// setAllUsers(fetchedUser)
// console.log('fetcheduser',fetchedUser);


// }

// useEffect(()=>{
// console.log('verify',verify);

//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//     // console.log('user email',user);
//     const  {emailVerified} = user
    
//     setAllUsers({emailVerified})
//       const uid = user.uid;

//       console.log('user email',user.emailVerified);
//           let collectionRef = collection(db,'users')

// let condition = where('emailVerified','==',user.emailVerified)

// let q = query(collectionRef,condition)

//  onSnapshot(q,(querySnapShot)=>{
//  querySnapShot.docChanges().forEach((change)=>{
//      console.log(change);
//      if (change.type === "added") {
// console.log( change.type
// );

//      }
//          if (change.type === "modified") {
//            console.log(change.type);

           
//          }
//          if (change.type === "removed") {
//          }
//      })
//  })

      
//       // ...
//     } else {
//       // User is signed out
//       // ...
//       console.log('user email is not');
      
//     }
//   });
// },[verify])

// if(user.emailVerified){
//      route.push('./home')
// }
// else{
//   console.log('user is not exist');
  
// }


useEffect(()=>{
if(realTimeUsers){
    realTimeUsers()
}
})


let realTimeUsers: Unsubscribe;
let collectionRef = collection(db,'users')

let currentUser = auth.currentUser?.uid
let condition = where('uid','==',currentUser)
let q = query(collectionRef,condition)

realTimeUsers = onSnapshot(q,(snapshot)=>{
  snapshot.docChanges().forEach((change)=>{
    if(change.type === 'added'){
        //  let user = change.doc.data()
        //  user.uid = change.doc.id
        console.log(change.doc.data(),'added');
        
    }
    if(change.type === 'modified'){
       route.push('/home')
       console.log(change.type);
       
    }
  })
})



    return(
        <>
             <h1>email verifi page</h1>
        

             <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
   
  </a>
  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
   please check your gmail and verified your email
  </p>

  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    send Email</button>
  
</div>

        </>
    )
}


{/* <a
  href="#"
  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  Read more
  <svg
    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 10"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 5h12m0 0L9 1m4 4L9 9"
    />
  </svg>
</a> */}