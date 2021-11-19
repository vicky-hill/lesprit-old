import { updateWord } from 'actions/words';
import React, { useState, useEffect, useRef } from 'react';

function Review({ close, words, updateWord }) {
    const [shrink, setShrink] = useState(false);
    const [value, setValue] = useState("");
    const [current, setCurrent] = useState({});

    const { native, foreign, rating, _id } = current;

    const getRandomWord = () => {
        if(words.length === 0) {
            return { native: "", foreign: "", rating: null, _id: null }
        } 
        
        const index = Math.floor(Math.random() * (words.length)) + 0;
        return words[index]
    }

    useEffect(() => {
        setCurrent(getRandomWord())
    }, [])

    const shrinkNative = () => {
        setShrink(true);
        refInput.current.focus();
    }

    const refInput = useRef(null);

    useEffect(() => {
        window.addEventListener('keydown', shrinkNative);

        return () => {
            window.removeEventListener('keydown', shrinkNative);
        };
    }, [])

    const checkAnswer = (typedAnswer) => {
        if(typedAnswer === foreign) {
            refInput.current.classList.add('correct');

            const newDate = addTime();

            updateWord(_id, {
                rating: rating + 1,
                dueDate: newDate
            })

            setTimeout(() => {
                resetReview();
                setCurrent(getRandomWord());
            }, 1000);


        }
    }

    const addTime = () => {
        let result = new Date();
        result.setDate(result.getDate() + 1);
        return result;
    }
 
    const onChange = async (e) => {
        setValue(e.target.value);
        checkAnswer(e.target.value);
    }

    const resetReview = () => {
        refInput.current.blur();
        setShrink(false);
        setValue("");
    }

    const closeReview = () => {
        resetReview();
        close()
    }

    return (
        <>
            <div className='review' onKeyDown={shrinkNative}>
                <h1 className={`review-native ${shrink ? ' review-native--small' : ''}`} >{ native }</h1>
                <input
                    // readOnly={true}
                    autoCapitalize="none"
                    className="review-input"
                    id="foreign" type="text"
                    value={value}
                    onChange={onChange}
                    onClick={shrinkNative}
                    // onKeyPress={keyboardAction}
                    autoComplete="off"
                    ref={refInput}
                />
                <i className="review-close fas fa-times" onClick={closeReview}></i>
            </div>
        </>
    )
}

export default Review;
