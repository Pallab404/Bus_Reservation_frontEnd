import React, { useState, useEffect } from "react";
import Profile from "../Profile";

const UserProfile = () => {
  const [ user, setUser] = useState()
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("User2"));
        setUser(data);
        // console.log(data)
    },[])


    if (!user) {
        return <p className="text-center mt-10">Loading profile...</p>; // or a loader
    }

  return (
    <div className="h-full">
      <Profile user={user}/>
    </div>
  )

};

export default UserProfile;
