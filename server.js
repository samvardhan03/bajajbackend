const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Example user data
const userID = 'student_name_ddmmyyyy'; 
const email = 'sj7873@srmist.edu.in';
const rollNumber = 'RA2111043020005';

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            error: 'Invalid input format. Expected an array of strings.'
        });
    }

    
    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => isNaN(item) && item.trim() !== '');


    const highestAlphabet = alphabets.length > 0 
        ? [alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).pop()] 
        : [];

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
