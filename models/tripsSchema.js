const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const tripSchema = new mongoose.Schema({
    departurePlace: { type: String, required: true },
    destination: { type: String, required: true },
    startingDate: { type: String, required: true },
    duration: { type: Number, required: true },
    numberOfPassengers: { type: Number, required: true }
});

module.exports = mongoose.model('trips', tripSchema);





