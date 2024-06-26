const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, time, message } = req.body;

    console.log('Received Appointment Data:', req.body);

    // Here you can add code to save the appointment data to a database

    res.status(200).send({ message: 'Votre rendez-vous a été demandé avec succès!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

