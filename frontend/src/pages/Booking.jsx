import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tickets: 1,
    paymentMethod: "upi", // "upi" or "cash"
  });

  const [screenshot, setScreenshot] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(null);
  const [totalPayment, setTotalPayment] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      eventId: id,
      ...formData,
      totalPayment,
    };

    const formPayload = new FormData();
    for (const key in bookingData) {
      formPayload.append(key, bookingData[key]);
    }
    if (screenshot) {
      formPayload.append("screenshot", screenshot);
    }

    try {
      setUploading(true);
      const res = await fetch("https://mini-project-college.onrender.com/api/bookings", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) throw new Error("Booking failed. Please try again.");

      setSubmitted(true);
      setTimeout(() => navigate("/thank-you"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
          Book Your Spot
        </h2>
        <p className="text-center text-gray-600 mb-6 text-lg">
          You're booking for:{" "}
          <span className="text-black font-semibold">{eventTitle}</span>
        </p>

        {ticketPrice === null ? (
          <p className="text-center text-gray-500">Loading event details...</p>
        ) : !submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
                className="w-full px-4 py-3 border rounded-xl"
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
                className="w-full px-4 py-3 border rounded-xl"
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
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Total Payment (₹):
              </label>
              <input
                type="text"
                value={totalPayment}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border rounded-xl cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Payment Method:
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="upi">UPI Transfer</option>
                <option value="cash">Cash On Event</option>
              </select>
            </div>

            {formData.paymentMethod === "upi" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pay to this UPI ID:
                  </label>
                  <input
                    type="text"
                    value="9109554428@amazonpay"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border rounded-xl cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Upload Payment Screenshot:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {formData.paymentMethod === "cash" && (
              <div className="text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 p-3 rounded-xl font-medium">
                Please pay ₹{totalPayment} in cash at the event registration desk
                to confirm your participation.
              </div>
            )}

            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition duration-300"
            >
              {uploading ? "Submitting..." : "Confirm Booking"}
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
