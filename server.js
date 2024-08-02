const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const userID = 'student_name_ddmmyyyy'; // Replace with your actual full name and DOB
const email = 'sj7873@srmist.edu.in';
const rollNumber = 'RA2111043020005';

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).pop()] : [];

    res.json({
        is_success: true,
        user_id: userID,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});


app.get('/', (req, res) => {
    res.send('Welcome to the BFHL backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
