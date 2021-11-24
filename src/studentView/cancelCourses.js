import "./cancelCourses.css";
import React from 'react';
import { userData } from "../contexts/userProfile";
import { db } from "../firebase";
import { getDoc, QuerySnapshot } from "@firebase/firestore";

export default function cancelCourses () {
    
    async function cancel(db) {
        const DocRef = await getDoc(collections(db, "Students"))
        const DocSnap = await getDoc(DocRef);
        if(DocSnap.exists()){
            const students= [];
            array.forEach(element => {
                
            });
        }
        await getDoc()
    }
    
    userData.ud  


}
