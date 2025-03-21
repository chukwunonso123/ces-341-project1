require('dotenv').config();
const express = require('express');
const mongoose = require('./db');
const contactsRoutes = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/users', contactsRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
