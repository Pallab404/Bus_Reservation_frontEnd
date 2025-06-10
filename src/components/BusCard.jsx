import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BusCard = ({ bus, routes }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [schedule, setSchedule] = useState({
    routeId: "",
    journeyStartDate: "",
    departureTime: "",
    arrivalTime: "",
    fare: "",
  });

  const navigate = useNavigate();

  // for popup
  const toggleForm = () => {
    if (showScheduleForm === true) {
      setShowScheduleForm(false);
    } else {
      setShowScheduleForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("ope-token");

      if (!schedule.routeId) {
        toast.error("Please select a route", { position: "top-center" });
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/operator/create-schedule",
        { busId: bus.id, ...schedule },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response.data;

      console.log(schedule, data);

      toast.success("Schedule added successfully!", { position: "top-center" });
      setShowScheduleForm(false); // Close the schedule form popup after submission
      bus.scheduled = true; // Used to update UI after add schedule, like showing the “Show Schedule” button instead of “Add Schedule”

      setSchedule({
        routeId: "",
        journeyStartDate: "",
        departureTime: "",
        arrivalTime: "",
        fare: "",
      });
    } catch (error) {
      toast.error(error.response?.data || error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="text-gray-700 space-y-2">
            <p>
              <b>Bus Name:</b> {bus.busName}
            </p>
            <p>
              <b>Bus Number:</b> {bus.busNumber}
            </p>
            <p>
              <b>Bus Type:</b> {bus.busType}
            </p>
            <p>
              <b>Total Seats:</b> {bus.totalSeats}
            </p>
          </div>

          {bus.scheduled ? (
            <button
              onClick={() =>
                navigate(`/operator/schedules/${bus.id}`)
              }
              className="mt-6 w-full py-2 rounded-md font-semibold text-white bg-purple-600 hover:bg-purple-700 transition"
            >
              Show Schedule
            </button>
          ) : (
            <button
              onClick={toggleForm}
              className="mt-6 w-full py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Add Schedule
            </button>
          )}
        </div>
      </div>

      {showScheduleForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleForm}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 shadow-lg relative"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Add Schedule for {bus.busName}
            </h3>

            <div className="mb-4">
              <label
                htmlFor="routeId"
                className="block mb-1 font-medium text-gray-700"
              >
                Select Route
              </label>
              <select
                id="routeId"
                name="routeId"
                value={schedule.routeId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">-- Select a Route --</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.source} ➝ {route.destination}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="journeyStartDate"
                className="block mb-1 font-medium text-gray-700"
              >
                Journey Start Date
              </label>
              <input
                id="journeyStartDate"
                type="date"
                name="journeyStartDate"
                value={schedule.journeyStartDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="departureTime"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Departure Time
                </label>
                <input
                  id="departureTime"
                  type="time"
                  name="departureTime"
                  value={schedule.departureTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="arrivalTime"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Arrival Time
                </label>
                <input
                  id="arrivalTime"
                  type="time"
                  name="arrivalTime"
                  value={schedule.arrivalTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="fare"
                className="block mb-1 font-medium text-gray-700"
              >
                Fare (₹)
              </label>
              <input
                id="fare"
                type="number"
                name="fare"
                min="0"
                placeholder="Fare (₹)"
                value={schedule.fare}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={toggleForm}
                className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
              >
                Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BusCard;
