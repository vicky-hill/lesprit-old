import React, { useState, useEffect, useRef } from 'react';

function Review({ close, words }) {
    const [shrink, setShrink] = useState(false);
    const [value, setValue] = useState("");
    const [current, setCurrent] = useState({});

    useEffect(() => {
        setCurrent(words[0])
    }, [])

    const { native, foreign, rating, _id } = current;

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
        }
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
