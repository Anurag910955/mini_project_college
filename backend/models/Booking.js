// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tickets: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
