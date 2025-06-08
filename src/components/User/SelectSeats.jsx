
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { GiSteeringWheel } from 'react-icons/gi';
// import { MdEventSeat } from 'react-icons/md';

// const SelectSeats = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { scheduleId } = location.state || {};

//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerDetails, setPassengerDetails] = useState({});

//   useEffect(() => {
//     if (!scheduleId) {
//       alert("Schedule ID not found. Redirecting...");
//       navigate('/user/book-tickets');
//       return;
//     }

//     const fetchSeats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `http://localhost:8080/api/user/seat-layout?scheduleId=${scheduleId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log(res)
//         setSeats(res.data);
//       } catch (err) {
//         console.error('Error fetching seat layout:', err);
//         alert('Failed to load seat layout.');
//       }
//     };

//     fetchSeats();
//   }, [scheduleId, navigate]);

//   const toggleSeat = (seatId, booked) => {
//     if (booked) return;
//     setSelectedSeats((prev) =>
//       prev.includes(seatId)
//         ? prev.filter((id) => id !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const handleInputChange = (seatId, field, value) => {
//     setPassengerDetails((prev) => ({
//       ...prev,
//       [seatId]: {
//         ...prev[seatId],
//         [field]: value,
//       },
//     }));
//   };

//   const seatStyle = (seat) => {
//     if (seat.booked) return 'text-red-500 cursor-not-allowed';
//     if (selectedSeats.includes(seat.seatId)) return 'text-green-600';
//     return 'text-gray-400 hover:text-blue-400';
//   };

//   const handlePayNow = () => {
//   const incomplete = selectedSeats.some(
//     (seatId) =>
//       !passengerDetails[seatId]?.name ||
//       !passengerDetails[seatId]?.age ||
//       !passengerDetails[seatId]?.gender
//   );
//   if (incomplete) {
//     alert('Please complete all passenger details.');
//     return;
//   }

//   const seatNumbers = selectedSeats.map((seatId) => {
//     const seat = seats.find((s) => s.seatId === seatId);
//     return seat?.seatNumber;
//   });

//   const passengers = selectedSeats.map((seatId) => ({
//     name: passengerDetails[seatId].name,
//     age: passengerDetails[seatId].age,
//     gender: passengerDetails[seatId].gender,
//   }));

//   const bookingData = {
//     scheduleId,
//     seatNumbers,
//     passengers,
//   };
//   console.log(bookingData)

//   navigate('/user/payment', { state: { bookingData } });
// };


//   // Organize seats into rows of 4 (2 left, 2 right)
//   const getSeatRows = () => {
//     const rows = [];
//     for (let i = 0; i < seats.length; i += 4) {
//       rows.push(seats.slice(i, i + 4));
//     }
//     return rows;
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
//       {/* Seat Layout */}
//       <div className="border border-gray-300 rounded-lg bg-white shadow p-4 w-full md:w-1/3 h-[580px]">
//         <div className="flex justify-end text-xl text-gray-700 mb-4">
//           <GiSteeringWheel />
//         </div>

//         <div className="flex flex-col space-y-3 items-center">
//           {getSeatRows().map((row, rowIndex) => (
//             <div key={rowIndex} className="grid grid-cols-5 gap-4 items-center">
//               {row.slice(0, 2).map((seat) => (
//                 <button
//                   key={seat.seatId}
//                   onClick={() => toggleSeat(seat.seatId, seat.booked)}
//                   disabled={seat.booked}
//                   className="flex flex-col items-center"
//                 >
//                   <MdEventSeat
//                     className={`text-2xl ${seatStyle(seat)}`}
//                     aria-label={`Seat ${seat.seatNumber}`}
//                   />
//                   <span className="text-xs">{seat.seatNumber}</span>
//                 </button>
//               ))}

//               {/* Aisle Gap */}
//               <div></div>

//               {row.slice(2).map((seat) => (
//                 <button
//                   key={seat.seatId}
//                   onClick={() => toggleSeat(seat.seatId, seat.booked)}
//                   disabled={seat.booked}
//                   className="flex flex-col items-center"
//                 >
//                   <MdEventSeat
//                     className={`text-2xl ${seatStyle(seat)}`}
//                     aria-label={`Seat ${seat.seatNumber}`}
//                   />
//                   <span className="text-xs">{seat.seatNumber}</span>
//                 </button>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Passenger Details */}
//       {selectedSeats.length > 0 && (
//         <div className="w-full md:w-1/2 space-y-4">
//           {selectedSeats.map((seatId) => {
//             const seat = seats.find((s) => s.seatId === seatId);
//             return (
//               <div key={seatId} className="p-4 border rounded bg-blue-50 shadow-sm">
//                 <h4 className="font-semibold mb-2">
//                   Passenger for {seat?.seatNumber || `Seat ${seatId}`}
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     value={passengerDetails[seatId]?.name || ''}
//                     onChange={(e) => handleInputChange(seatId, 'name', e.target.value)}
//                     className="p-2 border rounded"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Age"
//                     value={passengerDetails[seatId]?.age || ''}
//                     onChange={(e) => handleInputChange(seatId, 'age', e.target.value)}
//                     className="p-2 border rounded"
//                   />
//                   <select
//                     value={passengerDetails[seatId]?.gender || ''}
//                     onChange={(e) => handleInputChange(seatId, 'gender', e.target.value)}
//                     className="p-2 border rounded"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>
//               </div>
//             );
//           })}

//           <div className="text-right">
//             <button
//               onClick={handlePayNow}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Pay Now
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectSeats;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdEventSeat } from 'react-icons/md';

const SelectSeats = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scheduleId } = location.state || {};

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({});

  useEffect(() => {
    if (!scheduleId) {
      alert("Schedule ID not found. Redirecting...");
      navigate('/user/book-tickets');
      return;
    }

    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem("user-token");
        const res = await axios.get(
          `http://localhost:8080/api/user/seat-layout?scheduleId=${scheduleId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSeats(res.data);
      } catch (err) {
        console.error('Error fetching seat layout:', err);
        alert('Failed to load seat layout.');
      }
    };

    fetchSeats();
  }, [scheduleId, navigate]);

  const toggleSeat = (seatId, booked) => {
    if (booked) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleInputChange = (seatId, field, value) => {
    setPassengerDetails((prev) => ({
      ...prev,
      [seatId]: {
        ...prev[seatId],
        [field]: value,
      },
    }));
  };

  const seatStyle = (seat) => {
    if (seat.booked) return 'text-red-500 cursor-not-allowed';
    if (selectedSeats.includes(seat.seatId)) return 'text-green-600';
    return 'text-gray-400 hover:text-blue-400';
  };

  const handlePayNow = () => {
    const incomplete = selectedSeats.some(
      (seatId) =>
        !passengerDetails[seatId]?.name ||
        !passengerDetails[seatId]?.age ||
        !passengerDetails[seatId]?.gender
    );
    if (incomplete) {
      alert('Please complete all passenger details.');
      return;
    }

    const seatNumbers = selectedSeats.map((seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return seat?.seatNumber;
    });

    const passengers = selectedSeats.map((seatId) => ({
      name: passengerDetails[seatId].name,
      age: parseInt(passengerDetails[seatId].age, 10),
      gender: passengerDetails[seatId].gender,
    }));

    const bookingData = {
      scheduleId,
      seatNumbers,
      passengers,
    };
    const totalFare = calculateTotalFare()

    console.log(bookingData);
    navigate('/user/payment', { state: { bookingData,totalFare } });
  };

  const getSeatRows = () => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 4) {
      rows.push(seats.slice(i, i + 4));
    }
    return rows;
  };

  const calculateTotalFare = () => {
    return selectedSeats.reduce((sum, seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return sum + (seat?.fare || 0);
    }, 0);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Seat Layout */}
      <div className="border border-gray-300 rounded-lg bg-white shadow p-4 w-full md:w-1/3 h-[580px]">
        <div className="flex justify-end text-xl text-gray-700 mb-4">
          <GiSteeringWheel />
        </div>

        <div className="flex flex-col space-y-3 items-center">
          {getSeatRows().map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-4 items-center">
              {row.slice(0, 2).map((seat) => (
                <button
                  key={seat.seatId}
                  onClick={() => toggleSeat(seat.seatId, seat.booked)}
                  disabled={seat.booked}
                  className="flex flex-col items-center"
                >
                  <MdEventSeat
                    className={`text-2xl ${seatStyle(seat)}`}
                    aria-label={`Seat ${seat.seatNumber}`}
                  />
                  <span className="text-xs">{seat.seatNumber}</span>
                </button>
              ))}
              <div></div>
              {row.slice(2).map((seat) => (
                <button
                  key={seat.seatId}
                  onClick={() => toggleSeat(seat.seatId, seat.booked)}
                  disabled={seat.booked}
                  className="flex flex-col items-center"
                >
                  <MdEventSeat
                    className={`text-2xl ${seatStyle(seat)}`}
                    aria-label={`Seat ${seat.seatNumber}`}
                  />
                  <span className="text-xs">{seat.seatNumber}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Passenger Details */}
      {selectedSeats.length > 0 && (
        <div className="w-full md:w-1/2 space-y-4">
          {selectedSeats.map((seatId) => {
            const seat = seats.find((s) => s.seatId === seatId);
            return (
              <div key={seatId} className="p-4 border rounded bg-blue-50 shadow-sm">
                <h4 className="font-semibold mb-2">
                  Passenger for {seat?.seatNumber || `Seat ${seatId}`} (₹{seat?.fare || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={passengerDetails[seatId]?.name || ''}
                    onChange={(e) => handleInputChange(seatId, 'name', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={passengerDetails[seatId]?.age || ''}
                    onChange={(e) => handleInputChange(seatId, 'age', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <select
                    value={passengerDetails[seatId]?.gender || ''}
                    onChange={(e) => handleInputChange(seatId, 'gender', e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            );
          })}

          {/* Total Price Display */}
          <div className="text-right font-semibold text-lg text-gray-700">
            Total Amount: ₹{calculateTotalFare()}
          </div>

          <div className="text-right">
            <button
              onClick={handlePayNow}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSeats;

