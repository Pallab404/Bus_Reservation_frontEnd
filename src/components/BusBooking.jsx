import React, { useState } from 'react';
import SelectSeats from './SelectSeats';

const BusBooking = () => {
  const [formData, setFormData] = useState({ from: '', to: '', date: '' });
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const dummyBuses = [
    {
      id: 1,
      busName: 'Express Line',
      departureTime: '10:00 AM',
      arrivalTime: '2:00 PM',
      seatsAvailable: 12,
      fare: '$25',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  const handleBook = (bus) => {
    setSelectedBus({ ...bus, ...formData });
  };

  // If bus is selected, render seat selection
  if (selectedBus) {
    return <SelectSeats bus={selectedBus} />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input type="text" name="from" placeholder="From" required onChange={(e) => setFormData({ ...formData, from: e.target.value })} className="p-2 border rounded" />
          <input type="text" name="to" placeholder="To" required onChange={(e) => setFormData({ ...formData, to: e.target.value })} className="p-2 border rounded" />
          <input type="date" name="date" required onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search Buses</button>
      </form>

      {searchPerformed && dummyBuses.map((bus) => (
        <div key={bus.id} className="flex justify-between items-center p-4 border rounded shadow-sm bg-white">
          <div>
            <p className="font-bold">{bus.busName}</p>
            <p>Time: {bus.departureTime} → {bus.arrivalTime}</p>
            <p>Fare: {bus.fare}</p>
          </div>
          <button onClick={() => handleBook(bus)} className="bg-green-600 text-white px-4 py-2 rounded">Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default BusBooking;
