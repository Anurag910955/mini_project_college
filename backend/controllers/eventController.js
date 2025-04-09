import Event from '../models/Event.js';

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
};
export const getEventById = async (req, res, next) => {
  try {
    console.log("Got event ID:", req.params.id); // 🔍 this line helps debug
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    next(error);
  }
};
