"use client"
import { app } from "@/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged, sendEmailVerification, signOut } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext,ReactNode,useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";


type userType = {
    email: string | null,
    uid: string,
    emailVerified: boolean |null,
    // verify: boolean | null
   
}


type AuthContextType = {
   user: userType | any
   setUserTodo: userType | any
   userTodo: userType | any
sendData:   any
setSendData: any
verify:boolean,
// setVerify: boolean
 
}

const AuthContext = createContext<AuthContextType | null>(null)


export default function AuthContextProvider({children}: {children: ReactNode}){
const route = useRouter()
const [user,setUser] = useState<userType | null>(null)
const [userTodo,setUserTodo] = useState<any>([])
const [verify,setVerify] = useState<any |null>(null)
const [sendData,setSendData] = useState<any>()

const db = getFirestore(app);

useEffect(()=>{
    const auth = getAuth(app);

    onAuthStateChanged(auth, (logInUser) => {
        
      if (logInUser) {
        const {email,uid,emailVerified} = logInUser
setUser({email,uid,emailVerified})
setVerify({emailVerified})
console.log(emailVerified);
// let id = localStorage.setItem('id',uid) 
if(emailVerified === true){
  route.push('/home')
}else{
  sendEmailVerification(logInUser)
  .then(() => {
   
    console.log('email sent',logInUser);
    route.push('/emailverified')

    
  }).catch(()=>{
console.log('Email verification not sent');

  })

 
}



        
      } else {
        console.log('user is not login');
        setUser(null)
route.push('/')
      }
    });
   


},[])
 




    return(
      // <AuthContext.Provider value={{verify}}>

      <AuthContext.Provider value={{user,userTodo,setUserTodo,sendData,setSendData,verify}}>
{children}
</AuthContext.Provider>

)

}

export const UseAuthContext = ()=>useContext(AuthContext)