import React, { useState, useEffect } from 'react';

function Phrase({ phrase, highlight }) {

    const [seg1, setSeg1] = useState(phrase.split(highlight)[0]);
    const [seg2, setSeg2] = useState(phrase.split(highlight)[1]);

    return (
        <p>{seg1} <span className='review_phrase--covered'>{highlight}</span> {seg2}</p>
    );
}

export default Phrase;
