import React, { useState, useEffect, useRef } from 'react';
import Button from 'components/elements/Button';
import Phrase from 'components/review/Phrase';

import { connect } from 'react-redux';
import { correctAnswer, wrongAnswer, closeReview } from 'actions/review';

function Review({
    words,
    correctAnswer,
    wrongAnswer,
    review,
    current,
    loading,
    checkLevel,
    checkPhrase,
    checkHighlight,
    closeReview
}) {
    const [shrink, setShrink] = useState(false);
    const [button, setButton] = useState('Show Phrase');
    const [value, setValue] = useState('');

    const inputRef = useRef(null);

    // Current word
    const { foreign, native } = current;
    const nativeOptions = native && native.split(', ');


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

    // Show phrase
    const showPhrase = () => {
        if (button === 'Show Phrase') {
            inputRef.current.classList.remove('review_phrase--hide');
            setButton("Next");
        } else if (button === 'Next') {
            correctAnswer(current);

            // setCurrent(getRandomWord(words, current));
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

            setTimeout(() => {
                resetReview();
                correctAnswer(current);
            }, 1000);
        }
    }

    // Show answer on Enter
    const keyboardAction = (e) => {
        if (e.key === 'Enter') {
            inputRef.current.blur();

            if (value === '') {
                showAnswer();
            } else if (value !== foreign) {
                inputRef.current.classList.add('incorrect');
                showAnswer();
            }
        }
    }

    // Show answer
    const showAnswer = () => {
        if (checkLevel === 1 && checkPhrase) {
            setValue(' ' + native + ' '); // english
        } else {
            setValue(' ' + foreign + ' '); // spanish
        }

        setTimeout(() => {
            wrongAnswer(current);
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


    /* ===================================
       Level Components
    =================================== */
    const compLevel0 = (
        <div className='review review_level-1'>
            <h1 className='review_title'>{foreign}</h1>
            <div className="review_phrase review_phrase--hide" ref={inputRef}>
                <Phrase
                    word={current}
                />
            </div>
            <Button classes="w-250" id="show-phrase" onClick={showPhrase}>{button}</Button>
            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    );

    const compLevel1 = (
        <div className='review review_level-2'>
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

            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    )

    const compLevel2 = (
        <div className='review review_level-2'>
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

            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    )

    const compLevel10 = (

        <div className='review review_level-10' onKeyDown={shrinkNative}>
            <div className='review review_level-10'>
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
        </div>
    )


    return (
        !loading &&
            checkLevel === 0 && checkPhrase ? compLevel0 : 
                checkLevel === 1 && checkPhrase ? compLevel1 :
                    checkLevel === 2 && checkHighlight ? compLevel2 : compLevel10
    )
}

const mapStateToProps = (state) => ({
    current: state.review.current,
    loading: state.review.loading,
    review: state.review.reviewMode,
    checkLevel: state.review.level,
    checkPhrase: state.review.phrase,
    checkHighlight: state.review.highlight,
});

const mapDispatchToProps = {
    correctAnswer,
    wrongAnswer,
    closeReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
