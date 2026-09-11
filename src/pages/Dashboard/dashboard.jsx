import React from 'react'
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config.js';

const dashboard = () => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        M
                    </div>
                    <span className="text-xl font-bold text-gray-800 tracking-tight">MyApp</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-sm flex items-center gap-2"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="p-8">
                <h1 className="text-2xl font-bold">Welcome to Dashboard!</h1>
            </div>
        </div>
    )
}

export default dashboard
