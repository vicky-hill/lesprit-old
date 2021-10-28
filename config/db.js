const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.NODE_ENV === 'development' ? process.env.DB_URI : process.env.DB_TEST_URI;

const connectDB = async () => {
    const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
 
    const db = process.env.NODE_ENV === 'testing' ? 'TestingDB connected ...' : 'MongoDB connected ...';

    return db;
};

module.exports = connectDB;