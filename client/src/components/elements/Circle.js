import React from 'react';

function Circle({ windowClass, openRanking, circleImage, circleTitle, count }) {


    return (
        <div>
            <div className={windowClass + "-landing_review"} onClick={openRanking}>
                <h2 className={windowClass + "-landing_review--title"}>{circleTitle}</h2>
                <img className={windowClass + "-landing_review--circle"} src={circleImage} alt="circle" />
                <div className={windowClass + "-landing_review--tag"} >
                    <p><span id="counter" data-target={count}>{count}</span> Words<span className="check-mark" id="check-mark">✓</span></p>
                </div>
            </div>
        </div>
    )
}

export default Circle;
