import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Styles from "../Styles/Pages/Chat.module.css"

const Chat = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/login")
    }
  }, [navigate])
  
  return (
    <div className={Styles.container}>
      <div className={Styles.innercontainer}></div>
    </div>
  )
}

export default Chat