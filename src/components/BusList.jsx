import React, { useEffect, useState } from "react";
import BusCard from "./BusCard";
import axios from "axios";

const BusList = () => {

  const [buses , setBuses] = useState([])
  const [routes, setRoutes] = useState([]);

  //my busses
  useEffect(()=>{
    const fetchBus = async() =>{
      try {
        const token = localStorage.getItem("ope-token")
        const response = await axios.get("http://localhost:8080/api/operator/my-buses",{
           headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setBuses(response.data);

      } catch (error) {
        console.error("Failed to fetch bus", error);
        
      }
    }

    fetchBus();
  },[])


 // bus routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = localStorage.getItem("ope-token");
        const res = await axios.get("http://localhost:8080/api/routes/get-routes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoutes(res.data);
      } catch (error) {
        console.error("Failed to fetch routes", error);
      }
    };
    fetchRoutes();
  }, []);

return (
  <div className="space-y-4 p-2 max-w-full">
    <h1 className="text-3xl font-extrabold text-blue-700 mb-6">Operator Dashboard</h1>
    <div className="text-xl font-semibold text-gray-700 mb-4">
      Total Buses Added:{" "}
      <span className="text-blue-700 font-bold">{buses.length}</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
      {buses.map((bus) => (
        <div key={bus.id}className="w-full h-full">
          <BusCard  bus={bus} routes={routes}/>
        </div>
      ))}
    </div>
  </div>
);

};

export default BusList;
