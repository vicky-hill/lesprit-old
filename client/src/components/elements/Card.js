import React from 'react';

/* Props
=================================================== */
// type: String | stitched, panel
// radius: String | soft, hard




function Card({ radius, type, children }) {
    return (
        <div className={`${type}-card ${radius}-radius`}>
            { children }
        </div>
    )
}


Card.defaultProps = {    
    radius: "hard"
}


export default Card;
