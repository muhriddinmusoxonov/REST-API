const express = require('express');
const app = express();
require('dotenv').config();
const connect = require('./config/dbConnection');
const booksRoute = require('./routes/booksRout');
const authorsRoute = require('./routes/authorsRout');
const categoryRoute = require('./routes/categoryRout');

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', booksRoute);
app.use('/author', authorsRoute);
app.use('/category', categoryRoute);

app.get('/', (req, res) => {
    res.send('Hello')
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Port is run: http://localhost:${port}`);
})