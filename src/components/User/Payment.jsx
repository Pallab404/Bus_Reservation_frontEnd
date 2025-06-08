import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const totalFare = location.state?.totalFare;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cvv: '',
    expiry: '',
  });

  const handleConfirm = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'CARD') {
      const { cardNumber, cvv, expiry } = cardInfo;
      if (!cardNumber || !cvv || !expiry) {
        alert('Please fill in all card details.');
        return;
      }
    }

    const finalPayload = {
      scheduleId: bookingData.scheduleId,
      seatNumbers: bookingData.seatNumbers,
      passengers: bookingData.passengers,
      paymentMethod,
    };

    try {
      const token = localStorage.getItem('user-token');
      console.log(token)
      await axios.post('http://localhost:8080/api/user/book-seat', finalPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Booking successful!',{position: "top-center"});
      navigate('/user/booking-list');
    } catch (error) {
      console.error('Booking failed:', error);
      toast.warning('Payment failed. Try again.',{position: "top-center"});
    }finally{
        console.log(finalPayload);
        
    }
  };

  if (!bookingData) {
    return <div className="p-6 text-red-600">No booking data found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow mt-10 bg-white">
      <h2 className="text-xl font-bold mb-4">Payment</h2>

      <p className="mb-2">
        <strong>Seats:</strong> {bookingData.seatNumbers.join(', ')}
      </p>
      <p className="mb-4">
        <strong>Total Price:</strong> ₹{totalFare}
      </p>

      <div className="mb-4">
        <label className="font-medium block mb-1">Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Choose --</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
        </select>
      </div>

      {paymentMethod === 'UPI' && (
        <div className="mb-6 text-center">
          <p className="mb-2">Scan the QR to pay</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=dummy@upi&pn=BusBooking`}
            alt="QR Code"
            className="mx-auto"
          />
        </div>
      )}

      {paymentMethod === 'CARD' && (
        <div className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border rounded"
            value={cardInfo.cardNumber}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, cardNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 border rounded"
            value={cardInfo.cvv}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, cvv: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="w-full p-2 border rounded"
            value={cardInfo.expiry}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, expiry: e.target.value })
            }
          />
        </div>
      )}

      {paymentMethod && (
        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default Payment;
