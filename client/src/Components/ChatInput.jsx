import React, {useState} from "react";
// import Styles from "../Styles/Components/ChatInput.module.css";
import Styles from "../Styles/Components/ChatInput.module.css"
import Picker from "emoji-picker-react"
import {IoMdSend} from  "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({handleSendMessage}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setmsg] = useState("");

  const emojimodal = () =>{
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (emoji) =>{
    console.log(emoji)
    let message = msg;
    message += emoji.emoji;
    setmsg(...message);
  }

  const sendChat = (e) =>{
    e.preventDefault()
    if(msg.length >0 ){
      handleSendMessage(msg)
      setmsg("")
    }
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.buttonContainer}>
        <div className={Styles.emoji}>
          <BsEmojiSmileFill  onClick={emojimodal}/>
        </div>
        
      </div>
      <form onSubmit={(e)=>{sendChat(e)}}  className={Styles.InputContainer}>
        <input type="text" placeholder="type your message here" value={msg} onChange={(e) => setmsg(e.target.value)} />
        <button className={Styles.submit}>
            <IoMdSend/>
        </button>
      </form>
      {
         showEmojiPicker && 
        <div className={Styles.emojiPicker}  >

        <Picker onEmojiClick={handleEmojiClick} className={Styles.emojiBox}/>
        </div>
        }
    </div>
  );
};

export default ChatInput;
