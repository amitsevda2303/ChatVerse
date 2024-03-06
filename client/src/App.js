import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import SetAvatar from './Pages/SetAvatar'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/setavatar' element={<SetAvatar/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App