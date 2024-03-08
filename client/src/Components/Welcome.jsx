import React from 'react'
import Styles from "../Styles/Components/Welcome.module.css"
import robot from "../Assets/realrobot.gif"

const Welcome = ({currentUser}) => {
  return (
    <div className={Styles.container}>
        <img src={robot} alt="robot" />
        <h1>Welcome <span>{currentUser.username}</span></h1>
        <h3>Please select a chat to start messaging</h3>
    </div>
  )
}

export default Welcome