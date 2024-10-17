const express = require('express');
const app = express();
const mongoose = require('mongoose');
const tripsRouter = require('./routes/tripsRoutes');

app.use(express.json());
app.use('/trips', tripsRouter);

let URI = 'mongodb://localhost:27017/trips';
mongoose.connect(URI)
.then((conn) => {
    console.log(`Database connected: ${conn.connection.host}`);
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    })
})
.catch((err) => {
    console.log(err);
})