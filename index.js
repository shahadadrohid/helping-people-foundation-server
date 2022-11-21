const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json())




// Running Node
app.get('/', (req, res) => {
    res.send('Helping people foundation Server running')
})

app.listen(port, () => {
    console.log('HPFServer running properly')
})