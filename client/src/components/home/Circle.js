import React from 'react';
import goldCircle from '../../assets/graphics/gold-circle.png'
import silverCircle from '../../assets/graphics/silver-circle.png'

/* Props
=================================================== */
// windowClass: String | 'desktop', 'mobile'
// onClick: Function
// count: Number
// review: Boolean

function Circle({ review, windowClass, onClick, circleImage, circleTitle, count }) {

    return (
            <div className={windowClass + "-home_review"} onClick={onClick}>
                <h2 className={windowClass + "-home_review--title"}>{review ? "Study!" : "All done!"}</h2>
                <img className={windowClass + "-home_review--circle"} src={review ? silverCircle : goldCircle} alt="circle" />
                <div className={windowClass + "-home_review--tag"} >
                    <p><span id="counter" data-target={count}>{count}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
                </div>
            </div>
    )
}

export default Circle;
