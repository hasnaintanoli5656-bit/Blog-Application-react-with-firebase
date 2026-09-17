import { Box, Paper } from '@mui/material'
import { signInWithEmailAndPassword } from "firebase/auth";
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Input from '../../components/input'
import Button from '../../components/button'
import { auth } from '../../firebase/config.js';
import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import SignupWithGoogle from '../../components/signupwithgoogle'

const login = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const InputHandler = ( key , value) => {
    setForm((prev) => ({...prev , [key] : value }))
  } 

  const loginHandler = async () => {

    try {
      let response = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log(response)

      if (response.user) {
        toast.success("User Login succesfully!")
        setTimeout(() => {
          navigate("/")

        }, 3000);
      }
     
    } catch (error) {
      console.log(error.message)
      console.log(error.code)

      if (error.message == "Firebase: Error (auth/invalid-credential)." ||
        error.code == "auth/invalid-credential"
      ) {
        toast.error("Invalid Credentials!")
      }
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

        <h1 className='text-3xl font-bold text-center'> LOGIN PAGE </h1>
        <p className='text-[15px] text-stone-400 text-center
       '>WELCOME Back!  Please Enter Your Details</p>

        <Box>
          <Input
            label={"Enter Your Email"}
            type={"email"}
            id="email"
            handler={InputHandler}
            value={form.email}
          />
          <Input
            label={"Enter Your Password"}
            type={"password"}
            id="password"
            handler={InputHandler}
            value={form.password}
          />

          <Box className="flex justify-center  mb-4">
            <Button handler={loginHandler} title={"LOGIN"} />
          </Box>

          <SignupWithGoogle title={"LOGIN WITH GOOGLE"} />

          <Box className="text-center pt-3">
          <p className="text-sm text-slate-600">
            DON,T HAVE AN ACCOUNT ?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              GO TO SIGN-UP
            </Link>
          </p>
        </Box>

        </Box>
      </Paper>

      <ToastContainer />
    </Box>
  )
}

export default login

