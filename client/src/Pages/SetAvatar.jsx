import React, { useState, useEffect } from "react";
import loader from "../Assets/loader.gif";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "../Styles/Pages/SetAvatar.module.css";
import { setAvatarRoute } from "../Utils/ApiRoutes";
import axios from "axios";

const SetAvatar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
  const api = "https://api.multiavatar.com/";
  const [avatars, setAvatars] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.clear();
      const response = await fetch(`${api}${Math.round(Math.random() * 1000)}`);
      const imageUrl = response.url;
      setAvatars(imageUrl);
      setIsLoading(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const saveAvatar = async () => {
   
    try {
        
    if (!localStorage.getItem('user')) {
        return navigate('/login')       
    }
      const { data } = await axios.post(setAvatarRoute, {
        username: user.username ,
        avatar: avatars,
      });
      console.log(data)
      if (data.status === true) {
        localStorage.removeItem('user');
        
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
        toast.success("Avatar saved successfully");
      }
      navigate("/")
      if (data.status === false) {
        toast.success("Sorry some error Occured");
      }
      navigate("/login")
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('user')) {
        navigate("/login")        
    }
  }, [navigate])
  

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.innerContainer}>
          <h1>Pick your perfect avatar</h1>
          <div className={Styles.avatarDiv}>
            {isLoading ? (
              <img src={loader} alt="" />
            ) : (
              <img src={`${avatars}.png`} alt="avatar" />
            )}
            <button className={Styles.retrybtn} onClick={fetchData}>
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
          <button className={Styles.submitBtn} onClick={saveAvatar}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SetAvatar;
