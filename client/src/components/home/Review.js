import React, { useState, useEffect } from 'react';
import Level1 from 'components/review/Level1';
import Level10 from 'components/review/Level10';

function Review({ close, words, updateWord, review }) {
    const [current, setCurrent] = useState({});

    const { rating } = current;

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

    const addTime = (rating) => {
        let result = new Date();
        switch (rating) {
            case 0:
                result.setHours(result.getHours() + 7);
                return result;
            case 1:
                result.setHours(result.getHours() + 14);
                return result;
            case 2:
                result.setDate(result.getDate() + 1);
                return result;
            case 3:
                result.setDate(result.getDate() + 3);
                return result;
            case 4:
                result.setDate(result.getDate() + 7);
                return result;
            case 5:
                result.setDate(result.getDate() + 14);
                return result;
            case 6:
                result.setDate(result.getDate() + 21);
                return result;
            case 7:
                result.setMonth(result.getMonth() + 1);
                return result;
            case 8:
                result.setMonth(result.getMonth() + 2);
                return result;
            case 9:
                result.setMonth(result.getMonth() + 3);
                return result;
            case 10:
                result.setMonth(result.getMonth() + 4);
                return result;
            case 11:
                result.setMonth(result.getMonth() + 5);
                return result;
            case 12:
                result.setMonth(result.getMonth() + 6);
                return result;
            case 13:
                result.setMonth(result.getMonth() + 7);
                return result;
            case 14:
                result.setMonth(result.getMonth() + 8);
                return result;
            case 15:
                result.setMonth(result.getMonth() + 9);
                return result;
            case 16:
                result.setMonth(result.getMonth() + 10);
                return result;
            case 17:
                result.setMonth(result.getMonth() + 11);
                return result;
            case 18:
                result.setMonth(result.getMonth() + 12);
                return result;
            default:
                console.log(rating);
        }
        return result;
    }

    useEffect(() => {
        setCurrent(getRandomWord(words))
    }, []) // eslint-disable-line


    return (
        rating === 0 ? <Level1 addTime={addTime} words={words} current={current} setCurrent={setCurrent} closeReview={close} updateWord={updateWord} getRandomWord={getRandomWord}  /> :
        rating === 10 ? <Level10 current={current} setCurrent={setCurrent} getRandomWord={getRandomWord} review={review} updateWord={updateWord} close={close} words={words} /> :
        <div></div>
        
    )
}

export default Review;
