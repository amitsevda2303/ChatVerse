import { useState } from "react";
import { MyContext } from "./MyContext";

export default function Context({ children }) {
    const [username, setusername] = useState("")

    
const contextValue =  {username, setusername}

return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}
