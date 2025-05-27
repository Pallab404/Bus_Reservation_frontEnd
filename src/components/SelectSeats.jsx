import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdEventSeat } from 'react-icons/md';

const totalRows = 9;
const seatsPerSide = 2;
const bookedSeats = [3, 7, 15];

const BusSeatLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({});
  const navigate = useNavigate();

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleInputChange = (seat, field, value) => {
    setPassengerDetails((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value,
      },
    }));
  };

  const seatStyle = (seat) => {
    if (bookedSeats.includes(seat)) return 'text-red-500 cursor-not-allowed';
    if (selectedSeats.includes(seat)) return 'text-green-500';
    return 'text-gray-400 hover:text-blue-400';
  };

  const handleBookingConfirm = () => {
    // Check if all selected seats have details filled
    const incomplete = selectedSeats.some(
      (seat) =>
        !passengerDetails[seat]?.name || !passengerDetails[seat]?.age
    );
    if (incomplete) {
      alert('Please fill all passenger details before confirming.');
      return;
    }

    alert('Booking confirmed!');
    navigate('/user');
  };

  let seatCounter = 1;

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Left: Seat Layout */}
      <div className="border border-gray-300 rounded-lg bg-white shadow p-4 w-full md:w-1/3">
        {/* Steering wheel top right */}
        <div className="flex justify-end mb-1">
          <div className="text-xl text-gray-700">
            <GiSteeringWheel />
          </div>
        </div>

        {/* Divider line */}
        <hr className="border-t border-gray-300 mb-4" />

        {/* Seats grid */}
        <div className="space-y-3">
          {Array.from({ length: totalRows }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="flex justify-between items-center gap-6"
            >
              {/* Left side seats */}
              <div className="flex gap-2">
                {Array.from({ length: seatsPerSide }).map(() => {
                  const seat = seatCounter++;
                  return (
                    <button
                      key={seat}
                      onClick={() => toggleSeat(seat)}
                      disabled={bookedSeats.includes(seat)}
                      className="flex flex-col items-center"
                      type="button"
                    >
                      <MdEventSeat
                        className={`text-2xl ${seatStyle(seat)}`}
                        aria-label={`Seat ${seat}`}
                      />
                      <span className="text-xs">{seat}</span>
                    </button>
                  );
                })}
              </div>

              {/* Aisle */}
              <div className="w-4" />

              {/* Right side seats */}
              <div className="flex gap-2">
                {Array.from({ length: seatsPerSide }).map(() => {
                  const seat = seatCounter++;
                  return (
                    <button
                      key={seat}
                      onClick={() => toggleSeat(seat)}
                      disabled={bookedSeats.includes(seat)}
                      className="flex flex-col items-center"
                      type="button"
                    >
                      <MdEventSeat
                        className={`text-2xl ${seatStyle(seat)}`}
                        aria-label={`Seat ${seat}`}
                      />
                      <span className="text-xs">{seat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Passenger Forms */}
      <div className="w-full md:w-1/2 space-y-4">
        {selectedSeats.length === 0 ? (
          <div className="text-gray-500 text-center mt-8">
            Select seat(s) to fill passenger details
          </div>
        ) : (
          <>
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="p-4 border rounded bg-blue-50 shadow-sm"
              >
                <h4 className="font-semibold mb-2">Passenger for Seat {seat}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={passengerDetails[seat]?.name || ''}
                    onChange={(e) =>
                      handleInputChange(seat, 'name', e.target.value)
                    }
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={passengerDetails[seat]?.age || ''}
                    onChange={(e) =>
                      handleInputChange(seat, 'age', e.target.value)
                    }
                    className="p-2 border rounded"
                    min="0"
                  />
                </div>
              </div>
            ))}

            {/* Confirm Booking Button */}
            <div className="text-right mt-4">
              <button
                onClick={handleBookingConfirm}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                type="button"
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusSeatLayout;
