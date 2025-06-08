import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ScheduleList = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [schedules, setSchedules] = useState([]);

  // Fetch schedules
  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/operator/schedules/${busId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSchedules(Array.isArray(response.data) ? response.data : [response.data]);
      console.log(response.data); // Log response, not state
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [busId]);

const handleCancel = async (scheduleId) => {

  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:8080/api/operator/cancel/${scheduleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Optional but safe
        },
      }
    );
    toast.success("Schedule cancelled successfully.", { position: "top-center" });
    fetchSchedules();
  } catch (error) {
    console.error("Error cancelling schedule:", error);
    toast.error(error.response?.data || error.message, {position: "top-center",});
  }
};


  const handleShowReservation = (scheduleId) => {
    navigate(`/operator/booking/${scheduleId}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-2">30-Day Schedule</h2>
      <div className="space-y-5">
        {schedules.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No schedules found for this bus.</p>
        ) : (
          schedules.map((schedule, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md flex justify-between items-center"
            >
              <div className="space-y-1 max-w-[70%]">
                <p className="text-lg font-semibold text-gray-800">
                  {schedule.source} → {schedule.destination}
                </p>
                <p className="text-gray-600"><b>Date:</b> {schedule.journeyDate}</p>
                <p className="text-gray-600"><b>Seats Available:</b> {schedule.availableSeats ?? "N/A"}</p>
                <p className="text-gray-600"><b>Departure:</b> {schedule.departureTime}</p>
                <p className="text-gray-600"><b>Arrival:</b> {schedule.arrivalTime}</p>
                <p className="text-gray-600 font-medium">
                  Fare: <span className="text-green-700 font-semibold">₹{schedule.fare}</span>
                </p>
              </div>
              <div className="space-x-4 flex-shrink-0">
                <button
                  onClick={() => handleCancel(schedule.scheduleId)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
                >
                  Cancel
                </button>
                <button
                   onClick={() => handleShowReservation(schedule.scheduleId)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
                >
                  Show Bookings
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
