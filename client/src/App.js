import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App