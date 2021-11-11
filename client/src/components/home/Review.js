import React from 'react';

function Review({ close }) {
    return (
        <div>
                <h1 id="closing-x" onClick={close} >x</h1>
                <h3>Hello</h3>
        </div>
    )
}

export default Review;
