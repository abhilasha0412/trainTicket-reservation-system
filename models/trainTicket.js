
const mongoose = require('mongoose');

// Define the schema for a train ticket reservation
const trainTicketSchema = new mongoose.Schema({
    trainNumber: {
        type: String,
        required: true,
    },
    passengerName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: String,
        required: true,
    },
    journeyDate: {
        type: Date,
        required: true,
    },
    travelClass: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    farePerHour: {
        type: Number,
        default: 100,  // Default fare per hour
    },
    totalFare: {
        type: Number,
        default: 0,  // Will be calculated based on duration * farePerHour
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to calculate total fare
trainTicketSchema.methods.calculateTotalFare = function () {
    this.totalFare = this.duration * this.farePerHour;
};

// Export the TrainTicket model
const TrainTicket = mongoose.model('TrainTicket', trainTicketSchema);

module.exports = TrainTicket;