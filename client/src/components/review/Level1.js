import React, { useRef, useState, createRef } from 'react';
import Button from '../elements/Button';

function Level1 ({ current, closeReview }) {
    
    const [button, setButton] = useState('Show Phrase')

    const refPhrase = useRef(null);
    const refButton = createRef();

    const { foreign, phrases } = current;
    
    const showPhrase = () => {
        refPhrase.current.classList.remove('review_phrase--hide');
        setButton("Next")
    }

    return (
        <div className='review review_level-1'>
            <h1 className='review_title'>{foreign}</h1>
            <div className="review_phrase review_phrase--hide" ref={refPhrase}>
                <p>{phrases && phrases[0].phrase}</p>
            </div>
            <Button ref={refButton} classes="w-250" id="show-phrase" onClick={showPhrase}>{button}</Button>
            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    );
};

export default Level1;
