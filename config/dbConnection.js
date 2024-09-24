const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const dbConnection = async () => {
    try {
        mongoose.connect(uri);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnection