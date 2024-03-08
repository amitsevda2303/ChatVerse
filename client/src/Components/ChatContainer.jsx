import React, { useState, useEffect, useRef } from "react";
// import Styles from "../Styles/Components/ChatContainer.module.css";
// import ChatInput from "./ChatInput";
import ChatInput from "./ChatInput";
import Styles from "../Styles/Components/ChatContainer.module.css";
import axios from "axios";
import { sendMessaageRoute, getallMessaageRoute } from "../Utils/ApiRoutes";
import {v4 as uuidv4} from "uuid"

const ChatContainer = ({ currentChat, socket, currentUser }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessaageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const fetchChats = async () => {
   if(currentChat) {
    const response = await axios.post(getallMessaageRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }
  };

  useEffect(() => {
    fetchChats();
  }, [currentChat]);

  return (
    <>
      {currentChat && currentUser && (
        <div className={Styles.container}>
          <div className={Styles.chatHeader}>
            <div className={Styles.userDetails}>
              <div className={Styles.avatar}>
                <img src={`${currentChat.avatarImage}.png`} alt="avatar" />
              </div>
              <div className={Styles.username}>
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>

          <div className={Styles.chatMessages}>
            {messages.map((item, index) => {
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div
                    className={`${Styles.message} ${
                      item.fromSelf === true ? Styles.sended : Styles.received
                    }`}
                  >
                    <div className={Styles.content}>
                      <p>{item.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
