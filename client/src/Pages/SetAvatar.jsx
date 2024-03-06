import React, { useState } from 'react'
import Loader from "../Assets/loader.gif"

const SetAvatar = () => {
const [avatarName, setavatarName] = useState("Enter your name")
const [loader,setLoader] = useState(false)
const [imageurl,setimageurl] = useState("")
    const fetchAvatar = async() =>{
        setLoader(true)
        const avatar = await fetch(`https://api.multiavatar.com/${avatarName}.png`)
        const result = avatar.url
        setimageurl(result)
        console.log(result)
        setLoader(false)        
    }



    
  return (
    <div>
        <input type="text" value={avatarName} onChange={(e) =>{setavatarName(e.target.value)}} />
        <button onClick={fetchAvatar}>search</button>
        {loader? <img src={Loader} alt="" />:<img src={imageurl}/>}
    </div>
  )
}

export default SetAvatar