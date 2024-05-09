const express = require('express');
const morgan = require('morgan');

const app = express();

// Use morgan with 'tiny' configuration
app.use(morgan('tiny'));

// Parse incoming requests with JSON payloads
app.use(express.json());

app.post('/', (req, res) => {
    // Extract the Timestamp property from the request body
    const { Timestamp, LastReadTimestamp } = req.body;
    const standardizedTimestamp = Timestamp || LastReadTimestamp;

    // Convert the Timestamp from microseconds to milliseconds to a Date object
    const date = new Date(Math.round(standardizedTimestamp / 1000)); // Correct conversion

    // Log the request body and the local date format
    console.log('Request body:', { ...req.body, localtime: date.toLocaleString() });

    res.status(200).send('Received');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});