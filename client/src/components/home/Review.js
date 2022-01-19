import React, { useState, useEffect } from 'react';
import Level1 from 'components/review/Level1';
// import Level10 from 'components/review/Level10';

function Review({ close, words, updateWord, review }) {
    const [current, setCurrent] = useState({});

    const getRandomWord = (words, correctWord) => {
        if (correctWord) {
            words.splice(words.indexOf(correctWord), 1);
        }

        if (words.length === 0) {
            close();
            return { native: "", foreign: "", rating: null, _id: null }
        }

        const index = Math.floor(Math.random() * (words.length)) + 0;
        return words[index]
    }

    useEffect(() => {
        setCurrent(getRandomWord(words))
    }, []) // eslint-disable-line

    return (
        <Level1 current={current} closeReview={close} />
        // <Level10 current={current} setCurrent={setCurrent} getRandomWord={getRandomWord} review={review} updateWord={updateWord} close={close} words={words} /> 
    )
}

export default Review;
