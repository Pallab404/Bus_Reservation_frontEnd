import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusBooking = () => {
  const [formData, setFormData] = useState({ from: '', to: '', date: '' });
  const [sourceLocations, setSourceLocations] = useState([]);
  const [destinationLocations, setDestinationLocations] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [availableBuses, setAvailableBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/routes/sources')
      .then(res => setSourceLocations(res.data))
      .catch(err => console.error('Error fetching sources:', err));

    axios.get('http://localhost:8080/api/routes/destinations')
      .then(res => setDestinationLocations(res.data))
      .catch(err => console.error('Error fetching destinations:', err));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const requestBody = {
      source: formData.from,
      destination: formData.to,
      journeyDate: formData.date,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/search-buses",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailableBuses(response.data);
      setSearchPerformed(true);
    } catch (err) {
      console.error("Error fetching buses:", err);
      alert("Failed to fetch buses. Please check the inputs or try again later.");
    }
  };

  const handleBook = (bus) => {
    // Pass scheduleId and other info via route state
    navigate('/user/select-seats', { state: { scheduleId: bus.scheduleId, busInfo: bus } });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Source</label>
            <select
              name="from"
              required
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Source</option>
              {sourceLocations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Destination</label>
            <select
              name="to"
              required
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="p-2 border rounded w-full"
            >
              <option value="">Select Destination</option>
              {destinationLocations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search Buses</button>
      </form>

      {searchPerformed && (
        availableBuses.length > 0 ? (
          availableBuses.map((bus) => (
            <div key={bus.scheduleId} className="flex justify-between items-center p-4 border rounded shadow-sm bg-white mb-2">
              <div>
                <p className="font-bold">{bus.busName}</p>
                <p>Time: {bus.departureTime} → {bus.arrivalTime}</p>
                <p>Fare: ${bus.fare}</p>
                <p>Seats Available: {bus.availableSeats}</p>
              </div>
              <button
                onClick={() => handleBook(bus)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No buses found for the selected route and date.</p>
        )
      )}
    </div>
  );
};

export default BusBooking;
