import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:5000/api/admin/events/${editingId}`
      : 'http://localhost:5000/api/admin/events';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save event');

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        image: '',
      });
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Handle edit button
  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date?.slice(0, 10),
      time: event.time, // use this
      location: event.location,
      price: event.price,
      image: event.image,
    });
    setEditingId(event._id);
  };
  

  return (
    <div className="w-screen min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 to-white">
  <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-700 drop-shadow-lg tracking-tight">
    Admin Dashboard
  </h1>

  {/* Form Section */}
  <form
    onSubmit={handleSubmit}
    className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-blue-200 max-w-4xl mx-auto grid gap-8 transition-all duration-500"
  >
    <h2 className="text-3xl font-semibold text-blue-900">
      {editingId ? 'Update Event' : 'Create Event'}
    </h2>

    <input
      type="text"
      name="title"
      placeholder="Event Title"
      value={formData.title}
      onChange={handleChange}
      className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      required
    />

    <textarea
      name="description"
      placeholder="Event Description"
      value={formData.description}
      onChange={handleChange}
      className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      required
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-semibold text-blue-700 mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      
      <div>
  <label className="block text-sm font-semibold text-blue-700 mb-2">Event Time</label>
  <input
    type="text"
    name="time"
    placeholder="e.g., 10:00 AM to 12:00 PM"
    value={formData.time}
    onChange={handleChange}
    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
    required
  />
</div>
    </div>

    <input
      type="text"
      name="location"
      placeholder="Event Location"
      value={formData.location}
      onChange={handleChange}
      className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      required
    />

    <input
      type="number"
      name="price"
      placeholder="Ticket Price"
      value={formData.price}
      onChange={handleChange}
      className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      required
    />

    <input
      type="text"
      name="image"
      placeholder="Image URL"
      value={formData.image}
      onChange={handleChange}
      className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      required
    />

    <button
      type="submit"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition duration-300"
    >
      {editingId ? 'Update Event' : 'Create Event'}
    </button>
  </form>

  {/* Events Table */}
  <div className="bg-white/90 backdrop-blur-md p-10 mt-16 shadow-2xl max-w-6xl mx-auto">
  <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">All Events</h2>
  <div className="overflow-x-auto shadow-sm">
    <table className="min-w-full border text-left bg-white rounded-xl overflow-hidden">
      <thead className="bg-blue-100 text-blue-800">
        <tr>
          <th className="p-4 border">Title</th>
          <th className="p-4 border">Date</th>
          <th className="p-4 border">Location</th>
          <th className="p-4 border">Tickets Sold</th>
          <th className="p-4 border">Total Collected</th>
          <th className="p-4 border">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white text-gray-700">
        {events.map(event => (
          <tr key={event._id} className="hover:bg-gray-50 transition">
            <td className="p-4 border">{event.title}</td>
            <td className="p-4 border">{new Date(event.date).toLocaleDateString()}</td>
            <td className="p-4 border">{event.location}</td>
            <td className="p-4 border">{event.ticketsSold || 0}</td>
            <td className="p-4 border">₹{event.totalAmount || 0}</td>
            <td className="p-4 border">
              <button
                onClick={() => handleEdit(event)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-400 hover:bg-yellow-500 hover:text-blue-600 transition transform hover:scale-105"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
        {events.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-6 text-gray-500">
              No events found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

</div>


  );
};

export default AdminDashboard;
