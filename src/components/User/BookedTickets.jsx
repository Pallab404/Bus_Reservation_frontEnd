
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleViewDetails = (ticketId) => {
    setSelectedTicketId(selectedTicketId === ticketId ? null : ticketId);
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/my-reservations', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      });
      setTickets(response.data.reverse());
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
  if (!window.confirm('Are you sure you want to cancel this booking?')) return;
  try {
    await axios.put(`http://localhost:8080/api/user/cancel-booking/${bookingId}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`,
      },
    });
    toast.success('Booking cancelled successfully',{position:"top-center"});
    fetchTickets(); // refresh bookings
  } catch (err) {
    console.error('Error cancelling booking', err);
    alert('Failed to cancel booking');
  }
};


  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Booked Tickets</h2>
      {tickets.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.bookingId}>
              <div className="flex justify-between items-center p-4 border rounded shadow-sm bg-white">
                <div>
                  <p className="font-semibold">{ticket.busName} - {ticket.busNumber}</p>
                  <p className="text-sm text-gray-600">
                    {ticket.source} → {ticket.destination}
                  </p>
                  <p className="text-sm"><strong></strong>Journey Date: {ticket.journeyDate}</p>
                  <p className='text-sm'><strong>Time:</strong> {ticket.departureTime}</p>
                  {/* <p className="text-sm text-gray-600">Status: {ticket.bookingStatus}</p> */}
                </div>
                <div className="flex gap-2">
                  {ticket.cancelable && (
                    <button
                      onClick={() => handleCancelBooking(ticket.bookingId)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetails(ticket.bookingId)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {selectedTicketId === ticket.bookingId ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {selectedTicketId === ticket.bookingId && (
                <div className="mt-2 p-4 border rounded bg-blue-50 shadow-inner text-sm">
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">Passenger Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><strong>From:</strong> {ticket.source}</div>
                    <div><strong>To:</strong> {ticket.destination}</div>
                    <div><strong>Departure:</strong> {ticket.departureTime}</div>
                    <div><strong>Arrival:</strong> {ticket.arrivalTime}</div>
                    <div><strong>Status:</strong> {ticket.bookingStatus}</div>
                    <div><strong>Time:</strong> {ticket.departureTime}</div>
                    {/* <div><strong>Cancelable:</strong> {ticket.cancelable ? 'Yes' : 'No'}</div> */}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Passengers</h4>
                    <ul className="space-y-2">
                      {ticket.passengers.map((p, idx) => (
                        <li key={idx} className="bg-white p-2 border rounded">
                          <div><strong>Seat:</strong> {p.seatNumber}</div>
                          <div><strong>Name:</strong> {p.name}</div>
                          <div><strong>Age:</strong> {p.age}</div>
                          <div><strong>Gender:</strong> {p.gender}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTickets;

