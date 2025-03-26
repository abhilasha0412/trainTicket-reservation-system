const express = require('express');
const router = express.Router();
const trainTicketController = require('../controllers/trainTicketControllers');

// Train Ticket Reservation CRUD routes
router.post('/reservations', trainTicketController.createReservation); // Create a new reservation
router.get('/reservations', trainTicketController.getAllReservations); // Get all reservations
router.get('/reservations/:id', trainTicketController.getReservationById); // Get a reservation by ID
router.put('/reservations/:id', trainTicketController.updateReservation); // Update a reservation by ID
router.delete('/reservations/:id', trainTicketController.deleteReservation); // Delete a reservation by ID

module.exports = router;