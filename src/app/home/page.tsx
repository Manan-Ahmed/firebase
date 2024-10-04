"use client";

import { UseAuthContext } from "@/context/authContext";
import { auth } from "@/firebase/firebaseAuth";
import { fetchTodos, saveTodo } from "@/firebase/firebaseFireStore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { DocumentData, getFirestore, Unsubscribe } from "firebase/firestore";
import { h1 } from "framer-motion/client";
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { remove } from "firebase/database";
import Link from "next/link";
// const {user} = UseAuthContext()!


export default function Home() {
    const [todo, setTodo] = useState('')
const [allTodos,setAllTodos] = useState< DocumentData[]>([])

    useEffect(()=>{
     let detachOnAuthListner =  onAuthStateChanged(auth,(user)=>{
                 if(user){
                  data()
                 }  
      })
return () => {
  if(readTodoRealTime){
    console.log('component mount');
    
    readTodoRealTime()
    detachOnAuthListner()
  }
}
   
    },[])
    let readTodoRealTime: Unsubscribe;

   
   


    // const fatchAllTodos = async()=>{
    //   let fetchedData:  DocumentData[] = await fetchTodos()
    //   setAllTodos(fetchedData)
    // }


    const data = ()=>{
      
      

let collectionRef = collection(db,'todos')
let currentUser = auth.currentUser?.uid

let condition = where('uid','==',currentUser)

let q = query(collectionRef,condition)
let allTodosClone = [...allTodos]



  readTodoRealTime =  onSnapshot(q,(querySnapShot)=>{
  querySnapShot.docChanges().forEach((change)=>{
      if (change.type === "added") {
let todo = change.doc.data()
todo.id = change.doc.id
allTodosClone.push(todo)
console.log(change.doc.id);
console.log(change.doc.data());

setAllTodos([...allTodosClone])
      }
          if (change.type === "modified") {

          }
          if (change.type === "removed") {
          //  fetchTodos()
                   
          }
      })
  })


    }
    

    const logOut = ()=>{
        signOut(auth).then(() => {
          // Sign-out successful.
          console.log('logout');
          
        }).catch((error) => {
          // An error happened.
          console.log(error);
          
        });
    } 


    const db = getFirestore(app);






    return (
        <>

 <button type="button" onClick={logOut}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">LogOut</button>

<Link href={'./about'}>About</Link>
        <div className="max-w-md mx-auto">
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div className="relative">

     <input
      type="text"
      value={todo}
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="enter your Todo"
      onChange={(e)=>{setTodo(e.target.value)}}
    />
  <button onClick={()=>{saveTodo(todo),setTodo('')}}    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    addTodo
    
  </button>
  </div>

  

</div>
         
 {
                 allTodos.length > 0 ?
                    // allTodos.map(({ todo }) => <h1>{todo}</h1>) :
                    allTodos.map(({todo,id}:any,ind)=>(
                      <div key={ind}>
                        {todo}
    
   
                      </div>

                    )):
                    <></>
            }

    
</>
    )
  }
















{/* // "use client"
// import { UseAuthContext } from "@/context/authContext";
// import { deleteUser, getAuth, signOut } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { app } from "@/firebase/firebaseConfig";





// export default function Home(){ */}
{/* //   const [todo,setTodo] = useState<any>([]) */}

//   // // const [getTodo,setGetTodo] = useState<any>([])

//     const auth = getAuth();
  


//      function delet(){
//       const user:any = auth.currentUser;
//       console.log(user);
      
//       deleteUser(user).then(() => {
//         // User deleted.
//         console.log('user accounr delete');
        
//       }).catch((error) => {
//         // An error ocurred
//         // ...

//         console.log('user account is not delete');
        
//       });
//       }



//     const logOut = ()=>{
//         signOut(auth).then(() => {
//           // Sign-out successful.
//           console.log('logout');
          
//         }).catch((error) => {
//           // An error happened.
//           console.log(error);
          
//         });
//     }  


// //     const addTodo = (newTodo:any)=>{
// //      setTodo([...todo,newTodo])
// //       todoAddDb(todo)
// //       // setTodo('')

// // console.log('newTodo',todo);

   

// //     }

    
      
//       return(
//         <>

// {/* <nav className="bg-white border-gray-200 dark:bg-gray-900">
//   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//     <a
//       href="https://flowbite.com/"
//       className="flex items-center space-x-3 rtl:space-x-reverse"
//     >
//       <img
//         src="https://flowbite.com/docs/images/logo.svg"
//         className="h-8"
//         alt="Flowbite Logo"
//       />
//       <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//         Flowbite
//       </span>
//     </a>
//     <button
//       data-collapse-toggle="navbar-default"
//       type="button"
//       className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       aria-controls="navbar-default"
//       aria-expanded="false"
//     >
//       <span className="sr-only">Open main menu</span>
//       <svg
//         className="w-5 h-5"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 17 14"
//       >
//         <path
//           stroke="currentColor"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M1 1h15M1 7h15M1 13h15"
//         />
//       </svg>
//     </button>
//     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//       {/* <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
//             aria-current="page"
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//           >
//             About
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//           >
//             Services
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//           >
//             Pricing
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
//           >
//             Contact
//           </a>
//         </li>
//       </ul> */}
//       {/* <button type="button" onClick={delet}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">delete</button>

// <button type="button" onClick={logOut}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">LogOut</button>
// </div>
//   </div>
// </nav> */} 




//         </>
//     )
// }


