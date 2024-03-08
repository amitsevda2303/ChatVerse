import React, { useEffect, useState , useRef} from 'react'
import {useNavigate} from "react-router-dom"
import Styles from "../Styles/Pages/Chat.module.css"
import {allUsersRoute , host} from "../Utils/ApiRoutes"
import axios from "axios"
import Contacts from "../Components/Contacts"
import Welcome from '../Components/Welcome'
import ChatContainer from '../Components/ChatContainer'
import {io} from "socket.io-client"

const Chat = () => {
  const socket = useRef()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([]);
  const [currentUser , setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate("/login")
    }else{
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
      setIsLoaded(true)
    }
  }, [navigate])
  
  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  
  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }

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
        <Contacts  contacts ={contacts}  currentUser={currentUser} chatChange = {handleChatChange} />
        {
          isLoaded && currentChat === undefined ?
          <Welcome currentUser={currentUser}/>:
          <>
          {currentChat && currentUser && <ChatContainer socket= {socket} currentChat={currentChat} currentUser= {currentUser}/>}
          </>
        }
      </div>
    </div>
  )
}

export default Chat