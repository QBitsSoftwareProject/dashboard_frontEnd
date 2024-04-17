const mongoose = require('mongoose');
const { DB_URI } = require('./env');

const connect = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = { connect };