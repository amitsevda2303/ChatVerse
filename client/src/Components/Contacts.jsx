import React, { useState, useEffect } from "react";
import Styles from "../Styles/Components/Contacts.module.css";
import logo from "../Assets/logo2.png";

const Components = ({ contacts, currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setcurrentSelected] = useState(undefined);
  console.log(contacts)
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {};
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className={Styles.container}>
          <div className={Styles.brand}>
            <img src={logo} alt="ChatVerse" />

          </div>
          <div className={Styles.contacts}>
            {contacts.map((contact,index) =>{
              return (
                <div className={`${Styles.contact} ${index === currentSelected ? Styles.selected : ""}`} key={index}>
                  <div className={Styles.avatar}>
                  <img src={`${contact.avatarImage}.png`} alt="avatar" />
                  </div>
                  <div className={Styles.username}>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
               
              )
            })}
            
          </div>
          <div className={Styles.currentUser}>
            <div className={Styles.avatar}>
                  <img src={`${currentUserImage}.png`} alt="avatar" />
                  </div>
                  <div className={Styles.username}>
                    <h3>{currentUserName}</h3>
                  </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Components;
