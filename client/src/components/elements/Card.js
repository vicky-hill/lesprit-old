import React from 'react';

/* Props
=================================================== */
// type: String | stitched, panel, vocabulary, word
// radius: String | soft, hard


function Card({ radius, type, children }) {    

    let classes = '';

    if(radius) {
        classes = `${classes} ${radius}-radius`;
    }

    if(type) {
        classes = `${classes} ${type}-card`;
    }

    if(!radius) {
        switch (type) {
            case 'stitched':
                classes = `${classes} hard-radius`;
                break;

            case 'panel':
                classes = `${classes} medium-radius`;
                break;

            case 'vocabulary':
            case 'word':
                classes = `${classes} medium-radius`;
                break;
        
            default:
                break;
        }
    }

    

    return (
        <div className={classes}>
            { children}
        </div>
    )
}



export default Card;
