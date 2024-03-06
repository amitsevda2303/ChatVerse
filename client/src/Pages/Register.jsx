import React, {useState } from 'react'
import Styles from "../Styles/Pages/Register.module.css"
import {Link, useNavigate} from "react-router-dom"
import logo from "../Assets/logo2.png"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {toastOptions} from "../Utils/Toastoptions"
import axios from "axios"
import { registerRoute } from '../Utils/ApiRoutes'

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleSubmit = async(event) =>{
    event.preventDefault();
    if(handleValidation()){
      const {password,username,email} = values
      const {data} = await axios.post(registerRoute,{
        username,password,email,
      });
      if(data.status === false){
        toast.error(data.message, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('user', JSON.stringify(data.user))        
        navigate("/")
      }
      
    }
  }

const handleValidation = () =>{
  const {password,confirmPassword,username,email} = values
  if (password !== confirmPassword) {
        toast.error("password and confirm password should be the same",toastOptions)
        return false; 
  }
  else if (username.length < 3) {
    toast.error("Username should be atleast 3 characters long.",toastOptions)
    return false
  }
  else if (password.length < 8) {
    toast.error("Password should be atleast 8 characters long.",toastOptions)
    return false
  } else if(email === ""){
    toast.error("Email is required",toastOptions)
    return false
  }
  return true
}
  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  
  return (
    <>
    <div className={Styles.container}>

    <form onSubmit={(event)=>handleSubmit(event)} className={Styles.form}>
      <div className={Styles.brand}>
        <img src={logo} alt="" />
      </div>
      <input type="text" placeholder='Username' name='username' onChange={(e) =>{handleChange(e)}}/>
      <input type="email" placeholder='Email' name='email' onChange={(e) =>{handleChange(e)}}/>
      <input type="password" placeholder='Password' name='password' onChange={(e) =>{handleChange(e)}}/>
      <input type="text" placeholder='Confirm Password' name='confirmPassword' onChange={(e) =>{handleChange(e)}}/>
      <button type='submit'>Create User</button>
      <span>Already have an account ? <Link to={"/login"}>Login</Link></span>
    </form>
    <ToastContainer />
    </div>
    </>
  )
}

export default Register