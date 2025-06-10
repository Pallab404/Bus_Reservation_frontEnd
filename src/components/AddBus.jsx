import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddBus = () => {

  const navigate = useNavigate();

  const initialBusData = {
    busName: "",
    busNumber: "",
    busType: "",
    totalSeats: "",
  }
  const [bus, setBus] = useState(initialBusData);

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("ope-token");
      const response = await axios.post("http://localhost:8080/api/operator/addBus",bus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Bus added successfully!", { position: "top-center" });
      setBus(initialBusData)
      navigate("/operator/home")
    } catch (error) {
      toast.error(error.response?.data || error.message, { position: "top-center",});
    }
  };

  return (
    <div className="h-full bg-blue-50 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-6xl px-8">
        <div className="bg-white shadow-xl rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-indigo-700 mb-6">Add Bus</h2>
            <p className="text-gray-500 mt-1">
              Fill in the details to add a new bus.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Bus Name
                </label>
                <input
                  type="text"
                  name="busName"
                  value={bus.busName}
                  onChange={handleChange}
                  placeholder="Enter Bus Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Bus Number
                </label>
                <input
                  type="text"
                  name="busNumber"
                  value={bus.busNumber}
                  onChange={handleChange}
                  placeholder="Enter Bus Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Bus Type
                </label>
                <select
                  name="busType"
                  value={bus.busType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Bus Type</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Seater">Seater</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  value={bus.totalSeats}
                  onChange={handleChange}
                  placeholder="Enter Total Seats"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                className="px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-blue-700"
              >
                Add Bus
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBus;
