import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";   
import Navbar2 from "../components/Navbar2";
import { Outlet } from "react-router-dom";

const userMenu = [
    { label: 'Profile', path: '/user/profile' },
    { label: 'Home', path: '/user/booking-List' },
    { label: 'Book Tickets', path: '/user/book-tickets'},
    { label: 'Logout', path: '/logout' },
];

const UserDash = () => {

    const [user,setUser] = useState('');

    useEffect(()=>{
        const storedUser = localStorage.getItem("User2");
        if(storedUser){
            const parseUser = JSON.parse(storedUser);
            setUser(parseUser.email);
            console.log(parseUser.email)
        }
    },[]);

  return (
    <div>
      <Navbar2 email={user} />
      <div className="flex">
        <Sidebar items={userMenu} />
        <main className="flex-1 ml-64 pt-20 p-6 bg-gray-100 min-h-screen">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default UserDash;

