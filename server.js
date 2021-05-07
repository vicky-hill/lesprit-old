const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const auth = require('./routes/auth');
const words = require('./routes/words');
const lists = require('./routes/lists');

const app = express();
const PORT =  5000;

connectDB();

app.use(express.json());

// Enable CORS
app.use(cors());


// Mount routers
app.use('/api/user', auth);
app.use('/api/words', words);
app.use('/api/lists', lists);


// Set react as static folder
// app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// }); 


app.listen(PORT, console.log('Server running on ' + PORT));

