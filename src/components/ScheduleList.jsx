import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ScheduleList = () => {
  const { busId } = useParams();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem("ope-token");
        const response = await axios.get(`http://localhost:8080/api/operator/schedules/${busId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSchedules(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [busId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">30-Day Schedule</h2>
      <div className="space-y-4">
        {schedules.length === 0 ? (
          <p>No schedules found for this bus.</p>
        ) : (
          schedules.map((schedule, index) => (
            <div key={index} className="p-4 border rounded-md bg-white shadow">
              <p><b>Date:</b> {schedule.journeyStartDate}</p>
              <p><b>Route ID:</b> {schedule.routeId}</p>
              <p><b>Seats Available:</b> {schedule.seats ?? "N/A"}</p>
              <p><b>Departure:</b> {schedule.departureTime}</p>
              <p><b>Arrival:</b> {schedule.arrivalTime}</p>
              <p><b>Fare:</b> ₹{schedule.fare}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
