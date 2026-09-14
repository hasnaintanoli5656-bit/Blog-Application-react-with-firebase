import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config.js'
import { useNavigate } from 'react-router-dom';

const protectedRoute = ({ children }) => {
    const [existuser, setExistUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setExistUser(CurrentUser);
            console.log("current user ya ha ",CurrentUser)
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

