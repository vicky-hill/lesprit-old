import {
    START_REVIEW,
    CLOSE_REVIEW,
    GET_RANDOM_WORD,
    UPDATE_WRONG_WORD,

} from './types';

import { updateWord } from './words';
import { openSlide, closeSlide } from 'actions/utils'


/* ===================================
   Start Review
=================================== */

export const startReview = (items) => async dispatch => {
    dispatch({
        type: START_REVIEW,
        payload: items
    })

    dispatch(openSlide());
    dispatch(getRandomWord());
}


/* ===================================
   Close Review
=================================== */

export const closeReview = () => async dispatch => {
    dispatch({
        type: CLOSE_REVIEW
    })

    dispatch(closeSlide());
}


/* ===================================
   Get Random Word
=================================== */

export const getRandomWord = (correctWord) => async (dispatch, getState) => {
    const words = getState().review.items;
    let randomWord = {};

    if (correctWord) {
        words.splice(words.indexOf(correctWord), 1);
    }

    if (words.length === 0) {
        return dispatch(closeReview());
    }

    const index = Math.floor(Math.random() * (words.length)) + 0;

    randomWord = words[index];
    const options = checkOptions(randomWord);

    dispatch({
        type: GET_RANDOM_WORD,
        payload: {
            correctWord: correctWord || "",
            randomWord,
            options
        }
    })

}


/* ===================================
   Check Options
=================================== */

function checkOptions(word) {
    const options = {
        level: 0,
        phrase: false,
        highlight: false
    }

    const { rating } = word;

    if (rating === 0) {
        options.level = 0;
    } else if (rating === 1) {
        options.level = 1;
    } else if (rating === 2) {
        options.level = 2;
    } else {
        options.level = 10;
    }

    // Word has phrase
    if (word.phrases[0].phrase !== '') {
        options.phrase = true;
    }

    // Word has highlight
    if (word.phrases[0].highlight !== '') {
        options.highlight = true;
    }

    return options;
}



/* ===================================
   Correct Answer
=================================== */

export const correctAnswer = (word) => async dispatch => {
    const newDate = addTime(word.rating);

    dispatch(updateWord(word._id, {
        rating: word.rating + 1,
        dueDate: newDate
    }));

    dispatch(getRandomWord(word));
}


/* ===================================
   Wrong Answer
=================================== */

export const wrongAnswer = (word) => async dispatch => {
    dispatch(updateWord(word._id, {
        rating: 1
    }));

    dispatch({
        type: UPDATE_WRONG_WORD,
        payload: word
    })

    dispatch(getRandomWord());
}


/* ===================================
   Add Time
=================================== */

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