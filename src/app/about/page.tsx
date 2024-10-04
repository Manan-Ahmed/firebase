"use client"

import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/firebaseConfig";
import Image from 'next/image'
import { auth } from "@/firebase/firebaseAuth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const db = getFirestore(app)


 export default function About(){
    const [file,setFile] = useState<File>()

const [progress,setProgress] = useState<number>()
const [imageUrl,setImageURL] = useState('')
const [errorMsg,setErrorMsg] = useState('')
const [caption,setCaption] = useState('')

const uploadFile = ()=>{

    if(!file){
       setErrorMsg(' select an image')

       return
    }
    setErrorMsg('')
const storage = getStorage(app);
console.log(file);

let newName = makeName(file.name)
const imageRef = ref(storage, `images/${newName}`);
try {
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on('state_changed',
       (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress)
  
         
       },
       (error) => {
          console.log(error);
       },
       () => {

          getDownloadURL(uploadTask.snapshot.ref)
             .then((downloadURL) => {
                console.log('File available at', downloadURL);
                setImageURL(downloadURL);
                saveDataFireStore(downloadURL)
             })
             .catch((e) => {
                console.log(e);
             })
       }
    );
}
catch(e){
console.log(e);

}
}

const makeName = (fileName:string): string=>{
   let fileNameArr = fileName.split('.')
   let lastIndex = fileNameArr.length - 1
   let fileExtention = fileNameArr[lastIndex]
let newName = `${crypto.randomUUID()}.${fileExtention}`
return newName
   
}

const saveDataFireStore = async (imageUrl:string)=>{
   let imageInfo = {
      imageUrl,
      caption,
      uid: auth.currentUser?.uid
   }
       let collectionName =  collection(db,'story')
   await addDoc(collectionName,imageInfo)
}
    return(
        <>
        
        <h1>hello Aout</h1>

        <input type="file"   onChange={(e)=>{
            let files = e.target.files
            if(files) setFile(files[0])
        }}/>
<br />
<textarea style={{border: '1px solid black'}} value={caption} onChange={(e)=>{setCaption(e.target.value)}} ></textarea>
        <button onClick={uploadFile}>upload</button>


        {
         imageUrl &&  <Image
      src={imageUrl}
      width={500}
      height={500}
      alt="Picture of the author"
    /> 
        }

        {
        progress && <p>Upload is   ${progress} % done</p>}
        {errorMsg && <p>{errorMsg}</p>}

     
            </>
    )
}
