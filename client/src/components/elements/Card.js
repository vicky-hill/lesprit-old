import React from 'react';

/* Props
=================================================== */
// type: String | stitched, panel, vocabulary, word, auth
// radius: String | soft, hard


function Card({ radius, type, children }) {    
    

    return (
        <div className={`${type}-card ${radius && radius + '-radius'}` }>
            { children}
        </div>
    )
}



export default Card;
