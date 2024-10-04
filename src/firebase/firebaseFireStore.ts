import { addDoc, collection, doc, DocumentData, getDocs, getFirestore, query,
     setDoc, where,onSnapshot, 
     deleteDoc} from "firebase/firestore"
import { auth } from "./firebaseAuth";
import { app } from "./firebaseConfig";

// import { collection, query, where, onSnapshot } from "firebase/firestore";


const db = getFirestore(app);

type UserType = {
    email: string,
    firstName: string,
    lastName: string,
    uid: string
    emailVerified: boolean
}

export async function saveUser(user:UserType) {

    
    // let docRef = doc(db, "collectionName", "docId")
    // await setDoc("where", "what");






    try {
        let docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, user);
        console.log('user add database',user);
        
    } catch (error) {
        console.log(error);

    }



}


export async function saveTodo(todo: string) {
    // collection(db, "collectionName")
    // addDoc("where", "what");

// console.log(isCompleted);

    let uid = auth.currentUser?.uid;
    let newTodo = { todo, uid};

    try {
        let collectionRef = collection(db, "todos")
        await addDoc(collectionRef, newTodo);
    } catch (error) {
        console.log(error)
    }

}

export async function fetchUsers(){
   let currentUser = auth.currentUser?.uid
    let collectionRef = collection(db,'users')
    let condition = where('uid','==',currentUser)
    let q = query(collectionRef,condition)

    let allUsersSnapShot = await getDocs(q)
let allUsers = allUsersSnapShot.docs.map((userSnapShot)=>{
   
    let user = userSnapShot.data()

    return user
})
return allUsers
}





export async function fetchTodos(){
    // let uid:any = localStorage.getItem('id')
    // if(uid){
// console.log('local',uid);

let currentUser = auth.currentUser?.uid 
    let collectionRef = collection(db,'todos')

    let condition = where('uid','==',currentUser)

let q = query(collectionRef,condition)

let allTodosSnapShot = await getDocs(q)

let allTodos = allTodosSnapShot.docs.map((todoSnapShot)=>{
         let todo = todoSnapShot.data()
         todo.id = todo.id
         return todo
           
})

return allTodos
    // }else{

    }
// }
  








// allTodosSnapShot.forEach((todo)=>{
//    let todoData = todo.data()
//    todoData.id = todo.id
//    console.log('get data from firestore',todoData);
//    console.log('current user==>',auth.currentUser);
// })












  

