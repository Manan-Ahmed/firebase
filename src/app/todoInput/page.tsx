// "use client"
// import { useEffect, useState } from "react"
// import TodoList from "../todoList/page"
// import { dbDataAdd, fetchData } from "@/firebase/firebaseFireStore"

// import { collection, getDocs, getFirestore } from "firebase/firestore"; 
// import { app } from "@/firebase/firebaseConfig";
// import { UseAuthContext } from "@/context/authContext";


// export default function TodoInput(){
//     const [newTodo,setNewTodo] = useState('')
// const [todo,setTodo] = useState<string[]>([])

// const [user,setUser] = useState()

// const db = getFirestore(app);


//     const addTodo = (add:any)=>{
    


//         dbDataAdd(add)
//         console.log('newTodo',add);
//         setTodo([...todo,add])
     
//             }

//              async function fetchData(){
//                 const querySnapshot = await getDocs(collection(db, "todos"));
//                 querySnapshot.forEach((doc) => {
//                   console.log(`${doc.data().todo}`);
//               })
              
              
//               }
//        fetchData()


//     return(
//         <>
//              <h1>Todo App</h1>
//             <div className="max-w-md mx-auto">
//   <label
//     htmlFor="default-search"
//     className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//   >
//     Search
//   </label>
//   <div className="relative">

//     <input
//       type="text"
//       value={newTodo}
//       id="default-search"
//       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       placeholder="enter your Todo"
//       onChange={(e)=>{setNewTodo(e.target.value)}}
//     />
//     <button
//       // type="submit"
//       className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//     onClick={(e)=>{addTodo(newTodo),setNewTodo('')}}
//    >
//       Add Todo
//     </button>
//   </div>
// </div>


// {
//     todo.map((todo:any,index)=>(
//     //   console.log(todo)
//       <div key={todo + index}>
//         <b>{todo}</b>
//         <button type="button"className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
//         <button type="button"className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>

//       </div>
//     ))
// }
        
//         </>
//     )
// }