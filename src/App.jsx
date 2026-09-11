import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Dashboard from './pages/Dashboard/dashboard'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup /> } />
      <Route path='/login' element={<Login /> } />
      <Route path='/signup' element={<Signup /> } />
      <Route path='/dashboard' element={<Dashboard /> } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
