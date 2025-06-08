import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";   
import Navbar2 from "../components/Navbar2";
import { Outlet } from "react-router-dom";

const operatorMenu = [
    { label: 'Home', path: '/operator/home' },
    { label: 'AddBus', path: '/operator/add-bus' },
    { label: 'Logout', path: '/operator/logout' },
];

const OperatorDashboard = () => {

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
        <Sidebar items={operatorMenu} />
        <main className="flex-1 ml-64 pt-20 p-6 bg-gray-100 min-h-screen">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default OperatorDashboard;
