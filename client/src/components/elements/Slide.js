import React from 'react';

function Slide({ open, children }) {

    return (
        <div className={`window slide-container ${open && 'slide-in'}`} id="slide-container">
            { children}
        </div>
    )
}

// Close slide by clicking on element with id
export const closeByClick = (setState, id = 'slide-container') => {
    document.addEventListener('click', function (e) {
        if (e.target.id === id) {
            setState(false);
        }
    });
}


export default Slide;
