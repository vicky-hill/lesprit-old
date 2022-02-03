import React, { useState, useEffect, useRef } from 'react';
import Button from 'components/elements/Button';
import Phrase from 'components/review/Phrase';

function Review({ close, words, updateWord, review }) {
    const [current, setCurrent] = useState({ phrases: [{ phrase: '', highlight: ''}]});
    const [shrink, setShrink] = useState(false);
    const [button, setButton] = useState('Show Phrase');
    const [value, setValue] = useState('');

    const inputRef = useRef(null);

    // Current word
    const { foreign, native, rating, phrases, _id } = current;
    const nativeOptions = native && native.split(', ');

    useEffect(() => {
        setCurrent(getRandomWord(words));
    }, []) // eslint-disable-line

    useEffect(() => {
        review ? window.addEventListener('keydown', shrinkNative) : window.removeEventListener('keydown', shrinkNative);

        return () => {
            window.removeEventListener('keydown', shrinkNative);
        };
    }, [review])

    // Get random word
    const getRandomWord = (words, correctWord) => {
        if (correctWord) {
            words.splice(words.indexOf(correctWord), 1);
        }

        if (words.length === 0) {
            close();
            return { native: "", foreign: "", phrases: [{phrase: '', highlight: ''}], rating: null, _id: null }
        }

        const index = Math.floor(Math.random() * (words.length)) + 0;
        return words[index]
    }

    const onChange = async (e) => {
        setValue(e.target.value);
        checkAnswer(e.target.value);
    }

    // Show phrase
    const showPhrase = () => {
        if (button === 'Show Phrase') {
            inputRef.current.classList.remove('review_phrase--hide');
            setButton("Next");
        } else if (button === 'Next') {
            updateCorrectWord();

            setCurrent(getRandomWord(words, current));
            setButton("Show Phrase");
            inputRef.current.classList.add('review_phrase--hide');
        }
    }

    // Shrink native input
    const shrinkNative = () => {
        setShrink(true);
        inputRef.current.focus();
    }

    // Check answer
    const checkAnswer = (typedAnswer) => {
        if (nativeOptions.includes(typedAnswer) || typedAnswer === foreign) {
            inputRef.current.classList.add('correct');
            inputRef.current.blur();

            updateCorrectWord();

            setTimeout(() => {
                resetReview();
                setCurrent(getRandomWord(words, current));
            }, 1000);
        }
    }

    // Show answer on Enter
    const keyboardAction = (e) => {
        if (e.key === 'Enter') {
            inputRef.current.blur();

            if (value === '') {
                showAnswer()
            } else if (value !== foreign) {
                inputRef.current.classList.add('incorrect');
                showAnswer()
            }
        }
    }

    // Show answer
    const showAnswer = () => {
        if (rating === 1 && phrases[0] || rating === 2 && phrases[0]) {
            setValue(' ' + native + ' ');
        } else {
            setValue(' ' + foreign + ' ');
        }

        updateWord(_id, {
            rating: 1
        });

        setTimeout(() => {
            setCurrent(getRandomWord(words));
            resetReview();
        }, 2500);
    }

    // Reset review
    const resetReview = () => {
        inputRef.current.blur();
        inputRef.current.classList.remove('incorrect');
        inputRef.current.classList.remove('correct');
        setShrink(false);
        setValue("");
    }

    // Update correct word
    const updateCorrectWord = () => {
        const newDate = addTime(rating);

        updateWord(_id, {
            rating: rating + 1,
            dueDate: newDate
        });
    }

    // Close review level 10
    const closeReview = () => {
        window.removeEventListener('keydown', shrinkNative);
        resetReview();
        close();
    }

    // Add Time
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


    /* ===================================
       Level Components
    =================================== */
    const compLevel1 = (
        <div className='review review_level-1'>
                 <p>Level 1</p>
            <h1 className='review_title'>{foreign}</h1>
            
            <div className="review_phrase review_phrase--hide" ref={inputRef}>
                <Phrase 
                    word={current}
                />
            </div>
            <Button classes="w-250" id="show-phrase" onClick={showPhrase}>{button}</Button>
            <i className="review-close fas fa-times" onClick={close}></i>
        </div>
    );

    const compLevel2 = (
        <div className='review review_level-2'>
            <p>Level 2</p>
            <h1 className='review_title'>{foreign}</h1>
            <div className="review_phrase">
                <Phrase 
                    word={current}
                />
            </div>
            <input
                autoCapitalize="none"
                placeholder='Translation'
                ref={inputRef}
                id="foreign"
                type="text"
                value={value}
                onChange={onChange}
                autoComplete="off"
                onKeyPress={keyboardAction}
            />

            <i className="review-close fas fa-times" onClick={close}></i>
        </div>
    )

    const compLevel3 = (
        <div className='review review_level-2'>
            <p>Level 3</p>
            <h1 className='review_title'>{native}</h1>
            <div className='review_phrase'>
                <Phrase 
                    blur
                    word={current}
                />
            </div>
            <input
                autoCapitalize="none"
                placeholder='Translation'
                ref={inputRef}
                id="foreign"
                type="text"
                value={value}
                onChange={onChange}
                autoComplete="off"
                onKeyPress={keyboardAction}
            />

            <i className="review-close fas fa-times" onClick={close}></i>
        </div>
    )

    const compLevel10 = (
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
                ref={inputRef}
            />
            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    )

    let phraseCheck = false;
    let highlightCheck = false;


    if(phrases[0].phrase !== '') {
        phraseCheck = true
    } 

    if(phrases[0].highlight !== '') {
        highlightCheck = true;
    }
 

    return (
        rating === 0 && phraseCheck ? compLevel1 :
            rating === 1 && phraseCheck ? compLevel2 :
                rating === 2 && highlightCheck ? compLevel3 : compLevel10

    )
}

export default Review;
