import React, { useState } from 'react';

const mockTickets = [
  {
    id: 1,
    passengerName: 'John Doe',
    phoneNumber: '123-456-7890',
    busName: 'Express Line',
    source: 'New York',
    destination: 'Boston',
    date: '2025-06-01',
    time: '10:00 AM',
    seat: 'A1',
  },
  {
    id: 2,
    passengerName: 'Jane Smith',
    phoneNumber: '987-654-3210',
    busName: 'Coastal Cruiser',
    source: 'Los Angeles',
    destination: 'San Francisco',
    date: '2025-06-02',
    time: '2:30 PM',
    seat: 'B4',
  },
];

const BookedTickets = () => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleViewDetails = (ticketId) => {
    setSelectedTicketId(selectedTicketId === ticketId ? null : ticketId);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Booked Bus Tickets</h2>
      <div className="space-y-4">
        {mockTickets.map((ticket) => (
          <div key={ticket.id}>
            <div className="flex justify-between items-center p-4 border rounded shadow-sm bg-white">
              <div>
                <p className="font-semibold">{ticket.passengerName}</p>
                <p className="text-sm text-gray-600">
                  {ticket.source} → {ticket.destination}
                </p>
                <p className="text-sm text-gray-600">Date: {ticket.date}</p>
              </div>
              <button
                onClick={() => handleViewDetails(ticket.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {selectedTicketId === ticket.id ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {selectedTicketId === ticket.id && (
              <div className="mt-2 p-4 border rounded bg-blue-50 shadow-inner text-sm">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Ticket Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><strong>Passenger Name:</strong> {ticket.passengerName}</div>
                  <div><strong>Phone Number:</strong> {ticket.phoneNumber}</div>
                  <div><strong>Bus Name:</strong> {ticket.busName}</div>
                  <div><strong>Seat:</strong> {ticket.seat}</div>
                  <div><strong>From:</strong> {ticket.source}</div>
                  <div><strong>To:</strong> {ticket.destination}</div>
                  <div><strong>Date:</strong> {ticket.date}</div>
                  <div><strong>Time:</strong> {ticket.time}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedTickets;
