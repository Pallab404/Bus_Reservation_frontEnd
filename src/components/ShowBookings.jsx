import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowBookings = () => {
  const { scheduleId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/operator/schedule/${scheduleId}/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [scheduleId]);

  if (loading) return <p className="p-4">Loading...</p>;

  if (bookings.length === 0) return <p className="p-4 text-red-600">No Bookings found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Reservations</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <p><strong>Booking ID:</strong> {booking.bookingId}</p>
          <p><strong>Customer Name:</strong> {booking.customerName}</p>
          <p><strong>Email:</strong> {booking.customerEmail}</p>
          <p><strong>Status:</strong> {booking.bookingStatus}</p>
          <p><strong>Payment:</strong> {booking.paymentStatus}</p>
          <p><strong>Seats:</strong> {booking.seatCount}</p>
          <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
          <p><strong>Booked At:</strong> {new Date(booking.bookingTime).toLocaleString()}</p>

          <div className="mt-2">
            <strong>Passengers:</strong>
            <ul className="list-disc ml-6">
              {booking.passengers.map((p, i) => (
                <li key={i}>{p.name} — Age: {p.age} — Seat: {p.seatNumber}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowBookings;
