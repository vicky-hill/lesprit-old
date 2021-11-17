import React from 'react';
import goldCircle from '../../assets/graphics/gold-circle.png'
import silverCircle from '../../assets/graphics/silver-circle.png'

/* Props
=================================================== */
// windowClass: String | 'desktop', 'mobile'
// onClick: Function
// count: Number
// review: Array

function Circle({ review, windowClass, onClick, count }) {

    const gold = (
        <div className={windowClass + "-home_review--tag"} >
            <p><span id="counter" data-target={count}>{count}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
        </div>
    )

    const silver = (
        <div className={windowClass + "-home_review--tag silver-tag"} >
            <p><span id="counter" data-target={count}>{review.length}</span></p>
        </div>
    )

    return (
        <div className={windowClass + "-home_review"} onClick={onClick}>
            <h2 className={windowClass + "-home_review--title"}>{review.length ? "Study!" : "All done!"}</h2>
            <img className={windowClass + "-home_review--circle"} src={review.length ? silverCircle : goldCircle} alt="circle" />
            { review.length ? silver : gold }
        </div>
    )
}

export default Circle;
