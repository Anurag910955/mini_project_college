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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://mini-project-college.onrender.com/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event data");
        const event = await res.json();

        setTicketPrice(Number(event.price));
        setEventTitle(event.title || "Event");
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvent();
  }, [id]);

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

  const generateUpiUrl = () => {
    const tn = `Booking for ${eventTitle}`;
    const tr = `Eventify-${eventTitle}-${Date.now()}`;
    return `upi://pay?pa=9109554428@ybl&pn=Eventify&am=${totalPayment}&tn=${encodeURIComponent(tn)}&tr=${tr}`;
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
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pay to this UPI ID:
              </label>
              <input
                type="text"
                value="9109554428@amazonpay"
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 cursor-not-allowed"
              />
            </div>

            <div className="text-center">
              {!isPaid ? (
                <>
                  <a
                    href={generateUpiUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition mb-2"
                  >
                    Pay via UPI
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPaid(true)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl"
                  >
                    I Have Paid
                  </button>
                </>
              ) : (
                <p className="text-green-600 text-center font-semibold">
                  ✅ Payment Done. You can now confirm your booking.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isPaid}
              className={`w-full py-3 rounded-xl font-bold transition duration-300 ${
                isPaid
                  ? "text-black bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed text-white"
              }`}
            >
              Confirm Booking
            </button>

            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}
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
