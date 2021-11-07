const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();
const PORT =  4000;

connectDB();

app.use(express.json());
app.use(cors());

// Mount routers
app.use('/', routes);


// Set react as static folder
app.use(express.static('client/build'));
app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
}); 


app.listen(PORT, console.log('Server running on ' + PORT));

