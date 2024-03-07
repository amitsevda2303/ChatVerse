import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Styles from "../Styles/Pages/Chat.module.css"
import {allUsersRoute} from "../Utils/ApiRoutes"
import axios from "axios"
import Contacts from "../Components/Contacts"

const Chat = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([]);
  const [currentUser , setCurrentUser] = useState(undefined)
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/login")
    }else{
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [navigate])
  

  useEffect(() => {
    const findContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImagesSet === true) {
          try {
            const response = await axios.get(`${allUsersRoute}/${currentUser.username}`)
            setContacts(response.data)
          } catch (error) {
            console.error('Error fetching contacts:', error)
          }
        } else {
          navigate("/setavatar")
        }
      }
    }

    findContacts()
  }, [currentUser, navigate ])
  
  return (
    <div className={Styles.container}>
      <div className={Styles.innercontainer}>
        <Contacts  contacts ={contacts}  currentUser={currentUser}  />
      </div>
    </div>
  )
}

export default Chat