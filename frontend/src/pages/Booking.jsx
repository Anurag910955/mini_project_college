import React, { useState, useEffect } from "react";
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
  const [paying, setPaying] = useState(false);

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

  const handleFakePayment = () => {
    setPaying(true);
    setTimeout(() => {
      setIsPaid(true);
      setPaying(false);
    }, 2000);
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
    <div className="w-screen min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-100 flex items-center justify-center p-6">
  <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-10 transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
    <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4 tracking-wide">
      Book Your Spot
    </h2>
    <p className="text-center text-gray-600 mb-6 text-lg">
      You're booking for:{" "}
      <span className="text-black font-semibold">{eventTitle}</span>
    </p>

    {ticketPrice === null ? (
      <p className="text-center text-gray-500">Loading event details...</p>
    ) : !submitted ? (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Your Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="E-mail"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Number of Tickets:
          </label>
          <input
            type="number"
            name="tickets"
            value={formData.tickets}
            min="1"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Total Payment (₹):
          </label>
          <input
            type="text"
            value={isNaN(totalPayment) ? "" : totalPayment}
            readOnly
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-700 cursor-not-allowed"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {!isPaid ? (
          <button
            type="button"
            onClick={handleFakePayment}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition duration-300"
          >
            {paying ? "Processing Payment..." : "Pay Now"}
          </button>
        ) : (
          <p className="text-green-600 text-center font-semibold">
            Payment Successful ✅
          </p>
        )}

        <button
          type="submit"
          disabled={!isPaid}
          className={`w-full py-3 rounded-xl font-bold transition duration-300 ${
            isPaid
              ? " text-blue "
              : " text-gray-50 cursor-not-allowed"
          }`}
        >
          Confirm Booking
        </button>
      </form>
    ) : (
      <div className="text-center mt-8">
        <p className="text-green-600 text-lg font-medium">
          🎉 Booking successful! Redirecting...
        </p>
      </div>
    )}
  </div>
</div>

  );
};

export default Booking;