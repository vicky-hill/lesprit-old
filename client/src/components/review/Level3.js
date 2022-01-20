import React, { useRef, useState } from 'react';

function Level3({ current, setCurrent, closeReview, updateWord, getRandomWord, addTime, words }) {

    const [value, setValue] = useState("");

    const refInput = useRef(null);

    const { native, foreign, phrases, rating, _id, highlight } = current;
    const nativeOptions = native.split(', ');

    const onChange = async (e) => {
        setValue(e.target.value);
        checkAnswer(e.target.value);
    }

    const checkAnswer = (typedAnswer) => {
        if (typedAnswer === foreign) {
            refInput.current.classList.add('correct');
            refInput.current.blur();

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

    const keyboardAction = (e) => {
        if (e.key === 'Enter') {
            refInput.current.blur();

            if (value === '') {
                showAnswer()
            } else if (value !== foreign) {
                refInput.current.classList.add('incorrect');
                showAnswer()
            }
        }
    }

    const showAnswer = () => {
        setValue(' ' + native + ' ');

        updateWord(_id, {
            rating: 1
        });

        setTimeout(() => {
            setCurrent(getRandomWord(words));
            resetReview();
        }, 2500);
    }

    const resetReview = () => {
        refInput.current.classList.remove('incorrect');
        refInput.current.classList.remove('correct');
        setValue("");
    }

    const phraseArray = phrases[0].phrase.split(phrases[0].highlight);
    const phraseSegment1 = phraseArray[0];
    const phraseSegment2 = phraseArray[1];

    console.log(highlight)

    return (
        <div className='review review_level-2'>
            <h1 className='review_title'>{native}</h1>
            <div className='review_phrase'>
                {/* <p>{phrases && phrases[0].phrase}</p> */}
                <p>{phraseSegment1} <span className='review_phrase--covered'>{phrases[0].highlight}</span> {phraseSegment2}</p>
            </div>
            <input
                autoCapitalize="none"
                placeholder='Translation'
                ref={refInput}
                id="foreign"
                type="text"
                value={value}
                onChange={onChange}
                autoComplete="off"
                onKeyPress={keyboardAction}
            />

            <i className="review-close fas fa-times" onClick={closeReview}></i>
        </div>
    );
};

export default Level3;