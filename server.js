const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mindful_minds'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Endpoint to handle appointment bookings
app.post('/book-appointment', (req, res) => {
    const { name, email, date, time } = req.body;

    // Save appointment to the database
    const query = 'INSERT INTO appointments (name, email, date, time) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, date, time], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Appointment booked successfully!' });
    });
});

// Endpoint to handle payment processing (example placeholder)
app.post('/process-payment', (req, res) => {
    // Process payment (this is a placeholder, actual payment processing would need integration with a payment gateway)
    res.json({ message: 'Payment processed successfully!' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
