const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');
const listRoutes = require('./lists/lists.routes');
const wordRoutes = require('./words/words.routes');


// Check backend health
router.get('/health-check', (req, res) => res.send('Great Health'));

// Mount auth routes @ api/user
router.use('/api/user', authRoutes)

// Mount list routes @ api/lists
router.use('/api/lists', listRoutes)

// Mount word routes @ api/words
router.use('/api/words', wordRoutes)

module.exports = router;