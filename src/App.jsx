import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Home from './pages/Dashboard/home'
import Blog from './pages/Dashboard/blog'
import ProtectedRoute from './components/protectedRoute'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<Signup /> } /> */}
      <Route path='/login' element={<Login /> } />
      <Route path='/signup' element={<Signup /> } />
      <Route path='/' element={<Home /> } />
      <Route path='/blog' element={<ProtectedRoute> <Blog /> </ProtectedRoute> } />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
