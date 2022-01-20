import React, { useRef, useState } from 'react';
import Button from '../elements/Button';

function Level1 ({ current, setCurrent, closeReview, updateWord, getRandomWord, addTime, words }) {
    
    const [button, setButton] = useState('Show Phrase')

    const refPhrase = useRef(null);

    const { foreign, phrases, rating, _id } = current;
    
    const showPhrase = () => {
        if(button === 'Show Phrase') {
            refPhrase.current.classList.remove('review_phrase--hide');
            setButton("Next");
        } else if (button === 'Next'){
            const newDate = addTime(rating);

            updateWord(_id, {
                rating: rating + 1,
                dueDate: newDate
            });
    
            setCurrent(getRandomWord(words, current));
            setButton("Show Phrase");
            refPhrase.current.classList.add('review_phrase--hide');
        }
    }

    return (
        <div className='review review_level-1'>
            <h1 className='review_title'>{foreign}</h1>
            <div className="review_phrase review_phrase--hide" ref={refPhrase}>
                <p>{phrases && phrases[0].phrase}</p>
            </div>
            <Button classes="w-250" id="show-phrase" onClick={showPhrase}>{button}</Button>
            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    );
};

export default Level1;
