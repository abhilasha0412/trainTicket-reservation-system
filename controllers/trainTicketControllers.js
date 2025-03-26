const TrainTicket = require('../models/trainTicket'); // Your TrainTicket model

// Create a new train ticket reservation
exports.createReservation = async (req, res) => {
    try {
        const { trainNumber, passengerName, phoneNumber, seatNumber, journeyDate, travelClass, duration } = req.body;

        const farePerHour = 100; // Default fare per hour
        const totalFare = (parseInt(duration, 10) || 0) * farePerHour;

        const newReservation = new TrainTicket({
            trainNumber,
            passengerName,
            phoneNumber,
            seatNumber,
            journeyDate: journeyDate ? new Date(journeyDate) : null,
            travelClass,
            duration,
            farePerHour,
            totalFare
        });

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation); // Return the newly created reservation
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const allReservations = await TrainTicket.find();
        res.json(allReservations);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a reservation by ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await TrainTicket.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a reservation by ID
exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { trainNumber, passengerName, phoneNumber, seatNumber, journeyDate, travelClass, duration } = req.body;

        const farePerHour = 100;
        const totalFare = (parseInt(duration, 10) || 0) * farePerHour;

        const updatedReservation = await TrainTicket.findByIdAndUpdate(
            id,
            { trainNumber,
               passengerName,
               phoneNumber,
               seatNumber, 
               journeyDate, 
               travelClass, 
               duration, 
               farePerHour, 
               totalFare
               },
            { new: true }
        );

        if (!updatedReservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a reservation by ID
exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await TrainTicket.findByIdAndDelete(id);

        if (!deletedReservation) return res.status(404).json({ error: 'Reservation not found' });

        res.json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};