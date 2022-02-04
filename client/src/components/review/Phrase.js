import React, { useState, useEffect } from 'react';

function Phrase({ word, blur }) {

    const [data, setData] = useState();
    const [classes, setClasses] = useState('review_phrase--bold');

    useEffect(() => {        
        setData({
            highlight: word.phrases[0].highlight,
            seg1: word.phrases[0].phrase.split(word.phrases[0].highlight)[0],
            seg2: word.phrases[0].phrase.split(word.phrases[0].highlight)[1],
        })

        if (blur) {
            setClasses('review_phrase--covered');
        }

    }, [blur, word])

    return (
        data ? <p>{ data.seg1} <span className={classes}>{ data.highlight}</span> { data.seg2 }</p> : <div></div>
    );
}

export default Phrase;
