import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config.js'
import { useNavigate } from 'react-router-dom';

export let userid = null
const protectedRoute = ({ children }) => {
    const [existuser, setExistUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setExistUser(CurrentUser);
            userid = CurrentUser.uid
            setLoading(false)
        });
        return () => unsubscribe();
    }, []);

    if(loading){
        return <div className="p-8 text-center font-bold">LOADING ......</div>;
    }
    if(!existuser){
     navigate("/login")
    }

    return (
        children
    )
}

export default protectedRoute

