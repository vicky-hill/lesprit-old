const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const { protect } = require('../middleware/auth');


// GET api/words  [Get all words from logged in user]
router.get('/', protect, async (req, res) => {
    try {
        const words = await Word.find({ user: req.user.id}).populate({
            path: 'list',
            select: 'title'
        });
        res.status(200).json(words);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
})


// GET api/words/review  [Get all words to be reviewed]
router.get('/review', protect, async (req, res) => {
    try {
        const words = await Word.find({ dueDate: { $lte: Date.now() }, user: req.user.id });
        res.status(200).json(words);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
})


// GET api/words/:id  [Get a single word]
router.get('/:id', protect, async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);

        if(!word) {
            return res.status(404).json({msg: "Word not found"});
        }

        res.status(200).json(word);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
})


// POST api/words  [Save a new word]
router.post('/', protect, async (req, res) => {
   
    try {
        const reqWord = {
            foreign: req.body.foreign,
            native: req.body.native,
            list: req.body.list,
            user: req.user.id
        }

        const newWord = await Word.create(reqWord);

        const word = await Word.findById(newWord._id).populate({
            path: 'list',
            select: 'title'
        });

        res.status(201).json(word);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
})


// PUT api/words/:id  [Update a word]
router.put('/:id', protect, async (req, res) => {
    try {
        const updateWord = await Word.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!updateWord) {
            return res.status(404).json({msg: "Word not found"});
        }

        const word = await Word.findById(updateWord._id).populate({
            path: 'list',
            select: 'title'
        });

        res.status(200).json(word);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
})


// DELETE api/words/:id  [Delete a word]
router.delete('/:id', protect, async (req, res) => {
    try {
        const word = await Word.findByIdAndDelete(req.params.id);

        if(!word) {
            return res.status(404).json({msg: "Word not found"});
        }
    
        res.status(200).json(word)
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong'});
    }
})


/* ===================================
   Dev Routes
=================================== */

// UPDATE api/words/devtools/all
router.put('/devtools/all', async (req, res) => {
    try {
        const allWords = await Word.updateMany({}, {$rename: {'spanish': 'foreign'}});

        if(!allWords) {
            return res.status(404).json({msg: "No words found"});
        }

        res.status(200).json(allWords);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
})


module.exports = router;