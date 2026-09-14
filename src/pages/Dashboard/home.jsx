import React from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';


const home = () => {
    const navigate = useNavigate();

    // const logoutHandler = async () => {
    //     try {
    //         await signOut(auth);
    //         navigate("/login");
    //     } catch (error) {
    //         console.log("Logout error:", error);
    //     }
    // };
    return (
       <>

        <Navbar />

        <h1 className='ml-7 mt-7 text-3xl font-bold'>THIS  IS A  HOME COMPONENT</h1>

        {/* <div className="flex items-center gap-4">
                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-sm flex items-center gap-2"
                    >
                        Logout
                    </button>
                </div> */}
      </>
    )
}

export default home
