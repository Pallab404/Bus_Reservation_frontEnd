import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowBookings = () => {
  const { scheduleId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("ope-token");
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

  if (loading)
    return (
      <p className="p-6 text-center text-lg text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  if (bookings.length === 0)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">
        No Bookings found.
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 pb-2">
        Bookings
      </h2>

      {bookings.map((booking) => (
        <div
          key={booking.bookingId}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Booking ID: {booking.bookingId}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.bookingStatus.toLowerCase() === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {booking.bookingStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-4">
            <div>
              <p>
                <span className="font-medium">Customer Name:</span>{" "}
                {booking.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {booking.customerEmail}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                {booking.paymentStatus}
              </p>
            </div>

            <div>
              <p>
                <span className="font-medium">Seats Booked:</span> {booking.seatCount}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span> ₹
                {booking.totalAmount}
              </p>
              <p>
                <span className="font-medium">Booked At:</span>{" "}
                {new Date(booking.bookingTime).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <strong className="text-gray-900 block mb-2">Passengers:</strong>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {booking.passengers.map((p, i) => (
                <li key={i} className="hover:bg-gray-50 rounded p-1 transition">
                  {p.name} — Age: {p.age} — Seat: {p.seatNumber}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowBookings;
