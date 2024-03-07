import React, {useEffect, useState } from 'react'
import Styles from "../Styles/Pages/Register.module.css"
import {Link, useNavigate} from "react-router-dom"
import logo from "../Assets/logo2.png"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {toastOptions} from "../Utils/Toastoptions"
import axios from "axios"
import { loginRoute } from '../Utils/ApiRoutes'

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  })
  const handleSubmit = async(event) =>{
    event.preventDefault();
    if(handleValidation()){
      const {password,username} = values
      const {data} = await axios.post(loginRoute,{
        username,password
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
  const {password,username} = values
  if (username === "") {
    toast.error("username and password should be required",toastOptions)
    return false
  }
  else if (password === "") {
    toast.error("username and password should be required",toastOptions)
    return false
  }
  return true
}
  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
  }, [navigate])
  
  return (
    <>
    <div className={Styles.container}>

    <form onSubmit={(event)=>handleSubmit(event)} className={Styles.form}>
      <div className={Styles.brand}>
        <img src={logo} alt="" />
      </div>
      <input type="text" placeholder='Username' name='username' min={3} onChange={(e) =>{handleChange(e)}}/>
      <input type="password" placeholder='Password' name='password' onChange={(e) =>{handleChange(e)}}/>
      <button type='submit'>Create User</button>
      <span>Don't have an account? <Link to={"/register"}>Register</Link></span>
    </form>
    <ToastContainer />
    </div>
    </>
  )
}

export default Login