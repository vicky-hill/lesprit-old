import React, { useState, useEffect, useRef } from 'react';

function Level1 ({ current, setCurrent, getRandomWord, review, updateWord, close, words, addTime }) {
    const [shrink, setShrink] = useState(false);
    const [value, setValue] = useState("");

    const { native, foreign, rating, _id } = current;

    const refInput = useRef(null);

    useEffect(() => {
        review ? window.addEventListener('keydown', shrinkNative) : window.removeEventListener('keydown', shrinkNative);

        return () => {
            window.removeEventListener('keydown', shrinkNative);
        };
    }, [review])

    const onChange = async (e) => {
        setValue(e.target.value);
        checkAnswer(e.target.value);
    }

    const checkAnswer = (typedAnswer) => {
        if (typedAnswer === foreign) {
            refInput.current.classList.add('correct');

            const newDate = addTime(rating);

            updateWord(_id, {
                rating: rating + 1,
                dueDate: newDate
            })

            setTimeout(() => {
                resetReview();
                setCurrent(getRandomWord(words, current));
            }, 1000);
        }
    }

    const shrinkNative = () => {
        setShrink(true);
        refInput.current.focus();
    }

    const resetReview = () => {
        refInput.current.blur();
        refInput.current.classList.remove('incorrect');
        refInput.current.classList.remove('correct');
        setShrink(false);
        setValue("");
    }

    const closeReview = () => {
        window.removeEventListener('keydown', shrinkNative);
        resetReview();
        close();
    }

    const keyboardAction = (e) => {
        if(e.key === 'Enter') {
            refInput.current.blur();

            if(value === '') {
                showAnswer()
            } else if (value !== foreign) {
                refInput.current.classList.add('incorrect');
                showAnswer()
            }
        }
    }

    const showAnswer = () => {
        setValue(' ' + foreign + ' ');

        if (rating !== 0) {
            updateWord(_id, {
                rating: 0
            });
        }

        setTimeout(() => {
            setCurrent(getRandomWord(words));
            resetReview();
        }, 2500);
    }

    return (
        <div className='review review_level-10' onKeyDown={shrinkNative}>
            <h1 className={`review_title ${shrink ? ' review_title--small' : ''}`} >{native}</h1>
            <input
                autoCapitalize="none"
                className="review-input"
                id="foreign" type="text"
                value={value}
                onChange={onChange}
                onClick={shrinkNative}
                onKeyPress={keyboardAction}
                autoComplete="off"
                ref={refInput}
            />
            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    );
};

export default Level1;