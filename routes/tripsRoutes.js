const express = require('express');
const router = express.Router();
const {getTrips, newTrip} = require('../controllers/tripsControllers');

router.get('/', getTrips);
router.post('/', newTrip);

module.exports = router;