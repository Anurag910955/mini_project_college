import React, { useState, useEffect } from "react";
import qr from "../assets/anurag.jpg";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tickets: 1,
  });

  const [ticketPrice, setTicketPrice] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [isPaid, setIsPaid] = useState(false);


  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://mini-project-college.onrender.com/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event data");
        const event = await res.json();

        setTicketPrice(Number(event.price)); // Updated from event.ticketPrice to event.price
        setEventTitle(event.title || "Event");
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvent();
  }, [id]);

  // Recalculate total payment when ticket count or price changes
  useEffect(() => {
    if (ticketPrice !== null) {
      setTotalPayment(formData.tickets * ticketPrice);
    }
  }, [formData.tickets, ticketPrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tickets" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://mini-project-college.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: id,
          ...formData,
          totalPayment,
        }),
      });

      if (!res.ok) {
        throw new Error("Booking failed. Please try again.");
      }

      setSubmitted(true);
      setTimeout(() => {
        navigate("/thank-you");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-10 transition-all duration-300 hover:shadow-[0_0_30px_5px_rgba(0,0,0,0.1)] hover:scale-[1.015]">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-2 tracking-wide drop-shadow-md">
        🎟️ Book Your Spot
      </h2>
      <p className="text-center text-gray-700 mb-6 text-lg md:text-xl font-medium">
        You’re booking for:{" "}
        <span className="text-black font-bold italic underline decoration-dashed underline-offset-4">
          {eventTitle}
        </span>
      </p>
  
      {ticketPrice === null ? (
        <p className="text-center text-gray-500 animate-pulse">Fetching event details...</p>
      ) : !submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ✏️ Your Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full px-4 py-3 text-gray-900 bg-white/80 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📧 Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-gray-900 bg-white/80 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🎫 Number of Tickets:
            </label>
            <input
              type="number"
              name="tickets"
              value={formData.tickets}
              min="1"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-900 bg-white/80 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              💰 Total Payment (₹):
            </label>
            <input
              type="text"
              value={isNaN(totalPayment) ? "" : totalPayment}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-2xl text-gray-700 cursor-not-allowed"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📱 UPI ID (Pay to):
            </label>
            <input
              type="text"
              value="9109554428@ybl"
              readOnly
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-700 font-semibold tracking-wider cursor-not-allowed"
            />
          </div>
  
          {error && (
            <p className="text-red-500 text-center font-semibold animate-pulse">{error}</p>
          )}
  
  {!isPaid ? (
  <>
    <div className="text-center mb-4">
      <p className="text-sm font-semibold text-gray-600 mb-2">
        📸 Scan QR to Pay (PhonePe):
      </p>
      <img
        src={qr} // Place this image in your public folder or use external URL
        alt="PhonePe QR"
        className="mx-auto w-40 h-40 rounded-xl border border-gray-300 shadow-md"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        🖼️ Upload Payment Screenshot:
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            setIsPaid(true);
          }
        }}
        className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-2xl shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />
    </div>
  </>
) : (
  <p className="text-green-600 text-center font-semibold animate-pulse">
    ✅ Screenshot received. You can now confirm your booking.
  </p>
)}

          <button
            type="submit"
            disabled={!isPaid}
            className={`w-full py-3 rounded-2xl font-bold shadow-md transition duration-300 ${
              isPaid
                ? "bg-blue-600 text-black hover:bg-blue-700 hover:shadow-lg"
                : "bg-white text-white cursor-not-allowed"
            }`}
          >
             Confirm Booking
          </button>
        </form>
      ) : (
        <div className="text-center mt-8">
          <p className="text-green-600 text-lg font-semibold animate-bounce">
            🎉 Booking successful! Redirecting...
          </p>
        </div>
      )}
    </div>
  </div>
  
  

  );
};

export default Booking;