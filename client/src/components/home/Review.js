import React, { useState, useEffect, useRef } from 'react';

function Review({ close, words, updateWord, review }) {
    const [shrink, setShrink] = useState(false);
    const [value, setValue] = useState("");
    const [current, setCurrent] = useState({});

    const { native, foreign, rating, _id } = current;

    const getRandomWord = (words, correctWord) => {
        if (correctWord) {
            words.splice(words.indexOf(correctWord), 1);
        }

        if (words.length === 0) {
            closeReview();      
            return { native: "", foreign: "", rating: null, _id: null }
        }

        const index = Math.floor(Math.random() * (words.length)) + 0;
        return words[index]
    }

    useEffect(() => {
        setCurrent(getRandomWord(words))
    }, []) // eslint-disable-line

    const shrinkNative = () => {
        setShrink(true);
        refInput.current.focus();
    }

    const refInput = useRef(null);

    useEffect(() => {
        review ? window.addEventListener('keydown', shrinkNative) : window.removeEventListener('keydown', shrinkNative);

        return () => {
            window.removeEventListener('keydown', shrinkNative);
        };
    }, [review])

    const checkAnswer = (typedAnswer) => {
        if (typedAnswer === foreign) {
            refInput.current.classList.add('correct');

            const newDate = addTime();

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

    const addTime = () => {
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

    const onChange = async (e) => {
        setValue(e.target.value);
        checkAnswer(e.target.value);
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
        <>
            <div className='review' onKeyDown={shrinkNative}>
                <h1 className={`review-native ${shrink ? ' review-native--small' : ''}`} >{native}</h1>
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
        </>
    )
}

export default Review;
