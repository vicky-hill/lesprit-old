import React, { useState, useEffect, useRef } from 'react';

function Review({ close }) {
    const [shrink, setShrink] = useState(false);
    const [value, setValue] = useState("");

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

    const onChange = async (e) => {
        setValue(e.target.value);
        // checkAnswer(e.target.value);
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
                <h1 className={`review-native ${shrink ? ' review-native--small' : ''}`} >word</h1>
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
