import React from 'react'
import { auth } from '../firebase/config.js';
import Button from '../components/button'
import { ToastContainer, toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import { Box } from '@mui/material'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { SaveDataIntoDB } from '../pages/Auth/signup.jsx';



const signupwithgoogle = ({title}) => {

    const navigate = useNavigate()

    const googleHandler = async () => {
        try{
          const provider = new GoogleAuthProvider();
          let response = await signInWithPopup(auth, provider)
          SaveDataIntoDB("" , response.user)
          if(response.user){
            toast.success("User sign-up Successfully")
            setTimeout(() => {
                navigate("/login")
            }, 3000);
            
          }
    
        } catch (error){
          toast.error(error.message)
        }
      }

    return (
        <Box className="flex justify-center ">
            <Button handler={googleHandler} title={title} icon={<GoogleIcon />} />
        </Box>
    )
}

export default signupwithgoogle
