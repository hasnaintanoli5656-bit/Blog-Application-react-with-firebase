import { Box, Paper } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import Input from '../../components/input'
import Button from '../../components/button'
import { auth } from '../../firebase/config.js';
import { useNavigate } from 'react-router-dom';

const signup = () => {

  const [form , setForm] = useState({
  email : "",
  password : "",
  username : ""
  })

  // const navigate = useNavigate()
  const InputHandler = ( key , value) => {
    setForm((prev) => ({...prev , [key] : value }))
  } 

  const SignupHandler = async () => {
    // console.log("signup button chala", form)
    
    try{
    let response = await createUserWithEmailAndPassword(auth, form.email, form.password);
    console.log(response)

    if(response.user){
     toast.success("User Sign-up succesfully!")
    //  navigate("/login")
    }

    } catch (error){
      console.log(error.message)
      console.log(error.code)

      if(error.message == "Firebase: Error (auth/invalid-email)." || 
        error.code == "auth/email-already-in-use"
      ){
        toast.warning("Email Is Already Exist!")
      }
    }
  }

  const googleHandler = async () => {
    try{
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider)

      if(response.user){
        toast.success("User sign-up Successfully")
        // navigate("/login")
      }

    } catch (error){
      toast.error(error.message)
    }
  }

  return (
    <Box className='bg-stone-100 flex  justify-center items-center h-[100vh] '>

      <Paper sx={{
        height: "auto",
        width: "400px",
        padding: "20px",
        borderRadius: "12px"
      }} elevation={5}
      >

        <h1 className='text-3xl font-bold text-center'> SIGN-UP PAGE </h1>
        <p className='text-[15px] text-stone-400 text-center
       '>WELCOME Back!  Please Enter Your Details</p>

        <Box>

          <Input
          label={"Enter Your UserName"} 
          type={"username"}
          handler={InputHandler}
          value={form.username}
          />
          <Input
          label={"Enter Your Email"}
          type={"email"}
          handler={InputHandler}
          value={form.email}
          />
          <Input
          label={"Enter Your Password"} 
          type={"password"}
          handler={InputHandler}
          value={form.password}
          />

          <Box className="flex justify-center  mb-5">
            <Button handler={SignupHandler}  title={"SIGN-UP"} />
          </Box>

          <Box className="flex justify-center ">
            <Button handler={googleHandler} title={"SIGN-UP WITH GOOGLE"} icon={ <GoogleIcon /> } />
          </Box>

        </Box>
      </Paper>

       <ToastContainer />
    </Box>

   
  )
}

export default signup
