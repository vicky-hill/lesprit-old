import React from 'react';

function Circle({ windowClass, onClick, circleImage, circleTitle, count }) {


    return (
            <div className={windowClass + "-home_review"} onClick={onClick}>
                <h2 className={windowClass + "-home_review--title"}>{circleTitle}</h2>
                <img className={windowClass + "-home_review--circle"} src={circleImage} alt="circle" />
                <div className={windowClass + "-home_review--tag"} >
                    <p><span id="counter" data-target={count}>{count}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
                </div>
            </div>
    )
}

export default Circle;
