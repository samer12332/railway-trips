const Trip = require('../models/tripsSchema');
const moment = require('moment')



const getTrips = async (req, res) => {
    try {
        const formatDate = (date) => {
            return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        let {page, limit, date_from, date_till, sort, ...queryObj} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        if (date_from || date_till) {
            queryObj.startingDate = {};
            date_from = date_from ? formatDate(date_from) : -Infinity;
            date_till = date_till ? formatDate(date_till) : Infinity
            queryObj.startingDate = {$gt: date_from, $lt: date_till}
        }
        //Find
        console.log(queryObj);
        let trips =  Trip.find(queryObj)
        trips.skip((page - 1) * limit).limit(limit);


        //Sort
        sort = sort ? sort.split(',').join(' ') : {};
        trips.sort(sort);
        console.log(sort)

        trips = await trips;

        res.status(200).json({
            length: trips.length,
            trips
        });
    } catch (err) {
        console.log(err);
    }
}

const newTrip = async (req, res) => {
    try {
        const formatDate = (date) => {
            return moment(date, 'YYYY-MM-DD', true).isValid() ? moment(date, 'YYYY-MM-DD').toDate() : null;
        }
        const { numberOfPassengers, startingDate } = req.body;
        if ( numberOfPassengers < 2) {
            return res.status(400).json({error: 'number Of Passengers must be greater than one'});
        }
        const formattedData = formatDate(startingDate);
        if(!formattedData) {
            return res.status(400).json({error: 'Date must be in a valid format'});
        }
        const trip = new Trip(req.body);
        await trip.save();
        res.status(200).json({
            length: trip.length,
            trip
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getTrips,
    newTrip
}